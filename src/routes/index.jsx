import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Dashborad from '../pages/Dashboard';
import Participantes from '../pages/Participantes';
import ParticipanteCadastro from '../pages/Participantes/Form/ParticipanteCadastro';
import ParticipanteEdit from '../pages/Participantes/Form/ParticipanteEdit';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashborad} isPrivate />
    <Route exact path="/participantes" component={Participantes} isPrivate />
    <Route
      exact
      path="/participantes/:id"
      component={ParticipanteEdit}
      isPrivate
    />
    <Route
      exact
      path="/participantes/cadastro"
      component={ParticipanteCadastro}
      isPrivate
    />
  </Switch>
);

export default Routes;
