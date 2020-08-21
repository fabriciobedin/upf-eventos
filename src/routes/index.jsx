import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Dashborad from '../pages/Dashboard';
import SubeventosCadastro from '../pages/Subeventos/Form/SubeventoCadastro';
import SubeventosEdit from '../pages/Subeventos/Form/SubeventoEdit';
import Participantes from '../pages/Participantes';
import ParticipanteCadastr from '../pages/Participantes/Form/ParticipanteCadastro';
import ParticipanteEdit from '../pages/Participantes/Form/ParticipanteEdit';

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
    <Route exact path="/participantes" component={Participantes} isPrivate />
    <Route
      exact
      path="/participantes/cadastro"
      component={ParticipanteCadastr}
      isPrivate
    />
    <Route
      exact
      path="/participantes/:id"
      component={ParticipanteEdit}
      isPrivate
    />
  </Switch>
);

export default Routes;
