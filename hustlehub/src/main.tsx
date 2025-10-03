import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import './index.css'
import App from './App.tsx'
import theme from './theme';
import './config/i18n.ts'; // Import i18n configuration

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed:', registrationError);
      });
  });
}


