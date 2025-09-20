
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import QuestionnairePage from './pages/Questionnaire';
import SuccessPage from './pages/Success';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Cacher le fallback loading dès que React se charge
const fallback = document.getElementById('loading-fallback');
if (fallback) {
  fallback.style.display = 'none';
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
