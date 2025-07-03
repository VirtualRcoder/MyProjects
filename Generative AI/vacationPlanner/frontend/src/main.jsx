// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"; // Tailwind CSS

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-3m5xb601yhqbwgz2.us.auth0.com';
const clientId = 'BXJQaMr2ZCiu1n0PHBVTkEg2SEUc3xRn';
const audience = 'http://vacationPlanner/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: audience
    }}
  >
    <App />
  </Auth0Provider>
);
