import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { Header, Footer } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App date="05/02/2026"/>
    <Footer />
  </React.StrictMode>
);