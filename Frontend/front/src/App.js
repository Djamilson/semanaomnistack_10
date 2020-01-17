import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './_services/history';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={4500} />
    </Router>
  );
}

export default App;
