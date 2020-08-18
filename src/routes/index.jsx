import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashborad from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/dashboard" component={Dashborad} isPrivate />
  </Switch>
);

export default Routes;
