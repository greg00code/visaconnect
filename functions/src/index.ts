/* eslint-disable max-len */
import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import Stripe from "stripe";
import {defineSecret} from "firebase-functions/params";

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

let stripe: Stripe;

const getStripe = () => {
  if (!stripe) {
    const stripeKey = stripeSecretKey.value();
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });
    console.log("Stripe initialized successfully");
  }
  return stripe;
};

export const createStripeCheckout = onCall({secrets: [stripeSecretKey]}, async (request) => {
  const planId = request.data.planId;
  const customerEmail = request.data.email; // Email du client depuis le formulaire
  const customerName = request.data.name; // Nom du client depuis le formulaire

  if (!planId) {
    throw new HttpsError(
      "invalid-argument",
      "The function must be called with one argument \"planId",
    );
  }

  const priceIds: {[key: string]: string} = {
    "autonomie": "price_1S3oMiAsVNsWdcEwm9N1Q79h",
    "premium": "price_1S2wWWAB92sSI5T0V760uXyR",
  };

  const priceId = priceIds[planId];

  if (!priceId) {
    throw new HttpsError(
      "not-found",
      `Invalid planId: ${planId}`,
    );
  }

  try {
    const stripeInstance = getStripe();
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://visaconnect.fr/success.html",
      cancel_url: "https://visaconnect.fr/",
      customer_email: customerEmail,
      metadata: {
        planId: planId,
        customerName: customerName || "",
      },
    });

    if (session.url) {
      return {checkoutUrl: session.url};
    } else {
      throw new HttpsError(
        "internal",
        "Failed to create Stripe session.",
      );
    }
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new HttpsError(
      "internal",
      "An error occurred while creating the Stripe session. Please try again.",
    );
  }
});

// Webhook pour gérer les événements Stripe (paiements réussis, échecs, etc.)
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

export const stripeWebhook = onRequest(
  {
    secrets: [stripeSecretKey, stripeWebhookSecret],
    cors: false, // Désactiver CORS pour les webhooks
  },
  async (request, response) => {
    const stripeKey = stripeSecretKey.value();
    const webhookSecret = stripeWebhookSecret.value();

    if (!stripeKey) {
      response.status(500).send("Stripe key not configured");
      return;
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const sig = request.headers["stripe-signature"];

    if (!sig || !webhookSecret) {
      response.status(400).send("Missing stripe signature or webhook secret");
      return;
    }

    let event: Stripe.Event;

    try {
      // Pour Firebase Functions v2, le body est déjà disponible en tant que Buffer
      const payload = request.rawBody || request.body;
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Gérer les différents types d'événements
    try {
      switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for session:", session.id);

        // Récupérer ou créer le customer ID Stripe
        let customerId = session.customer as string;

        // Si pas de customer ID, le créer
        if (!customerId && session.customer_email) {
          const customer = await stripe.customers.create({
            email: session.customer_email,
            name: session.metadata?.customerName || "",
          });
          customerId = customer.id;
        }

        // Générer un token unique pour le questionnaire basé sur le customer ID
        const questionnaireToken = `${customerId}_${Date.now()}`;
        const questionnaireLink = `https://visaconnect.fr/questionnaire?token=${questionnaireToken}`;

        // Créer le lien Google Drive (vous pourrez personnaliser cela)
        const driveLink = "https://drive.google.com/drive/folders/VOTRE_DOSSIER_ID"; // À remplacer par votre logique

        // Envoyer les données vers n8n pour traitement (email, Google Sheets, etc.)
        try {
          const fetch = (await import("node-fetch")).default;
          const webhookResponse = await fetch("https://n8n.galette.ovh/webhook/stripe-paiement", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: session.id,
              customerId: customerId,
              customerEmail: session.customer_email,
              customerName: session.metadata?.customerName || "",
              amount: (session.amount_total || 0) / 100, // Convertir de centimes en euros
              currency: session.currency,
              planId: session.metadata?.planId || "",
              questionnaireLink: questionnaireLink,
              driveLink: driveLink,
              timestamp: new Date().toISOString(),
            }),
          });

          if (!webhookResponse.ok) {
            console.error("Failed to send data to n8n:", await webhookResponse.text());
          } else {
            console.log("Successfully sent payment data to n8n");
          }
        } catch (webhookError) {
          console.error("Error sending data to n8n:", webhookError);
          // Ne pas faire échouer le webhook Stripe si n8n échoue
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        // Gérer l'échec du paiement
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
      }

      response.status(200).json({received: true});
    } catch (error) {
      console.error("Error processing webhook:", error);
      response.status(500).send("Webhook processing failed");
    }
  },
);
