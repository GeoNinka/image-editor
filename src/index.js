import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from 'react';

const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value='title'>
      <App/>
    </Context.Provider>
  </React.StrictMode>
);

