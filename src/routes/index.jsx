import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Dashborad from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashborad} isPrivate />
  </Switch>
);

export default Routes;
