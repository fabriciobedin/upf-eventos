import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';

import GlobalStyle from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';

const App = () => (
  <ConfirmProvider>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  </ConfirmProvider>
);

export default App;
