import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../services/auth';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Home from '../pages/home';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
