import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

// Configuration Firebase de votre application web
const firebaseConfig = {
  apiKey: "AIzaSyBKjTyYZFEiQ_HtnyrdWAuefv66FJLeeVQ",
  authDomain: "visaconnect-5157c.firebaseapp.com",
  projectId: "visaconnect-5157c",
  storageBucket: "visaconnect-5157c.firebasestorage.app",
  messagingSenderId: "969530578271",
  appId: "1:969530578271:web:4e6f3f7401bb48caea12ea",
  measurementId: "G-2YNX2PEB8B"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Spécifier la région pour les fonctions
const functions = getFunctions(app, 'us-central1');

// Exporter une référence à la fonction Cloud que nous allons appeler
export const createStripeCheckoutCallable = httpsCallable(functions, 'createStripeCheckout');
