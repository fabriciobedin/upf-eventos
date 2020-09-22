import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Dashborad from '../pages/Dashboard';
import Subeventos from '../pages/Subeventos/Listagem';
import SubeventosCadastro from '../pages/Subeventos/Form/SubeventoCadastro';
import SubeventosEdit from '../pages/Subeventos/Form/SubeventoEdit';
import EventosList from '../pages/Eventos/Listagem';
import EventoAdd from '../pages/Eventos/Form/EventoAdd';
import EventoEdit from '../pages/Eventos/Form/EventoEdit';
import Participantes from '../pages/Participantes/Listagem';
import ParticipanteCadastro from '../pages/Participantes/Cadastro';
import ParticipanteEdit from '../pages/Participantes/Edicao';
import InscricaoEvento from '../pages/InscricaoEvento';
import InscricaoSubevento from '../pages/InscricaoSubevento';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashborad} isPrivate />
    <Route
      exact
      path="/subevento/cadastro/:id"
      component={SubeventosCadastro}
      isPrivate
    />
    <Route
      exact
      path="/subevento/:id/participantes"
      component={InscricaoSubevento}
      isPrivate
    />
    <Route exact path="/subevento" component={Subeventos} isPrivate />
    <Route exact path="/subevento/:id" component={SubeventosEdit} isPrivate />
    <Route exact path="/eventos" component={EventosList} isPrivate />
    <Route exact path="/eventos/editar/:id" component={EventoEdit} isPrivate />
    <Route
      exact
      path="/eventos/:id/participantes"
      component={InscricaoEvento}
      isPrivate
    />
    <Route exact path="/eventos/cadastro/" component={EventoAdd} isPrivate />

    <Route exact path="/participantes" component={Participantes} isPrivate />

    <Route
      exact
      path="/participantes/cadastro"
      component={ParticipanteCadastro}
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
