import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from './AppProvider';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider children={<App />}/>
  </React.StrictMode>,
  document.getElementById('root')
);
