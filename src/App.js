import { Router } from 'react-router-dom';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from './styles/global';
import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  );
}

export default App;
