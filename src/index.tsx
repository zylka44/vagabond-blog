import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/fonts/Gilroy-ExtraBold.otf';
import './assets/fonts/Gilroy-Light.otf';
import './assets/fonts/Chronicle-Display-Black.otf';
import './assets/fonts/Chronicle-Display-Light-Italic.otf';
import './assets/fonts/Chronicle-Display-Roman.otf';
import './assets/fonts/Chronicle-Display-Semibold.otf';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
