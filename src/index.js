import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

var token = localStorage.getItem["x-access-token"]
// axios.defaults.baseURL = 'http://103.196.146.186:4001/';
axios.defaults.baseURL = 'https://backendsms.jeblast.com/';
// axios.defaults.baseURL = 'http://103.146.203.250:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = token;
const tokenUser = 'ujicoba';
axios.defaults.headers.common['usertoken'] = tokenUser;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
