import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from "./styles/global";
import Routes from './routes';
import AppProvider from './hooks';

const App = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
)

export default App;
