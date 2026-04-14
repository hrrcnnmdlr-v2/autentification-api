import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root')!;

if (!(window as any).reactRoot) {
  (window as any).reactRoot = ReactDOM.createRoot(rootElement);
}

(window as any).reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);