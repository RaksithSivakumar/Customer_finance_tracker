import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';  // optional: for custom styling
import App from './app'; // Your main App component
import './app.css';

// Render the App component inside the 'root' div of index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
