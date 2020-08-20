import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Dashborad from '../pages/Dashboard';
import SubeventosCadastro from '../pages/Subeventos/Form/SubeventoCadastro';
import SubeventosEdit from '../pages/Subeventos/Form/SubeventoEdit';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashborad} isPrivate />
    <Route
      exact
      path="/subevento/cadastro"
      component={SubeventosCadastro}
      isPrivate
    />
    <Route exact path="/subevento/:id" component={SubeventosEdit} isPrivate />
  </Switch>
);

export default Routes;
