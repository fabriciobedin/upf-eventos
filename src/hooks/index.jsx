import React from 'react';
import { ConfirmProvider } from 'material-ui-confirm';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ConfirmProvider>
      <ToastProvider>{children}</ToastProvider>
    </ConfirmProvider>
  </AuthProvider>
);
export default AppProvider;
