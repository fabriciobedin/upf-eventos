import React from 'react';

import { Switch } from 'react-router-dom';

import EventoIndex from '../pages/eventos';
import EventoCreate from '../pages/eventos/Create';
import EventoEdit from '../pages/eventos/Edit';
import EventoShow from '../pages/eventos/Show';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashborad from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/eventos/show/:id" component={EventoShow} isPrivate />
    <Route exact path="/eventos/edit/:id" component={EventoEdit} isPrivate />
    <Route exact path="/eventos/create" component={EventoCreate} isPrivate />
    <Route exact path="/eventos" component={EventoIndex} isPrivate />
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashborad} isPrivate />
  </Switch>
);

export default Routes;
