import React from 'react';
// import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import * as atatus from 'atatus-spa';

atatus.config('66aa9a050de44089ad0b37c4fbe53aa5').install();

const root = document.getElementById('root');
if (!root) throw new Error('Failed to find the root element');

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
