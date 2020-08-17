import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../services/auth';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Home from '../pages/home';
import EventoIndex from '../pages/eventos';
import EventoCreate from '../pages/eventos/Create';
import EventoEdit from '../pages/eventos/Edit';
import EventoShow from '../pages/eventos/Show';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/eventos/show/:id" component={EventoShow} />
          <PrivateRoute exact path="/eventos/edit/:id" component={EventoEdit} />
          <PrivateRoute exact path="/eventos/create" component={EventoCreate} />
          <PrivateRoute exact path="/eventos" component={EventoIndex} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
