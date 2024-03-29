import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import ResetPassword from '../pages/ResetPassword';
import SubeventosCadastro from '../pages/Subeventos/Form/SubeventoCadastro';
import SubeventosEdit from '../pages/Subeventos/Form/SubeventoEdit';
import EventosList from '../pages/Eventos/Listagem';
import EventoAdd from '../pages/Eventos/Form/EventoAdd';
import EventoEdit from '../pages/Eventos/Form/EventoEdit';
import EventoImportacao from '../pages/Eventos/Importacao/EventoImportacao';
import Participantes from '../pages/Participantes/Listagem';
import ParticipanteCadastro from '../pages/Participantes/Cadastro';
import ParticipanteEdit from '../pages/Participantes/Edicao';
import Usuarios from '../pages/Usuarios/Listagem';
import InscricaoSubevento from '../pages/InscricaoSubevento';
import Perfil from '../pages/Perfil';
import OrganizadoresCadastro from '../pages/Organizadores/Cadastro';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/resetpassword" component={ResetPassword} />
    <Route exact path="/eventos" component={EventosList} isPrivate />
    <Route exact path="/eventos/cadastro" component={EventoAdd} isPrivate />
    <Route
      exact
      path="/eventos/importacao"
      component={EventoImportacao}
      isPrivate
    />
    <Route exact path="/eventos/:idEvento" component={EventoEdit} isPrivate />
    <Route
      exact
      path="/eventos/:idEvento/subeventos/cadastro"
      component={SubeventosCadastro}
      isPrivate
    />
    <Route
      exact
      path="/eventos/:idEvento/subeventos/:idSubevento"
      component={SubeventosEdit}
      isPrivate
    />
    <Route
      exact
      path="/eventos/:idEvento/subeventos/:idSubevento/participantes/cadastro"
      component={InscricaoSubevento}
      isPrivate
    />
    <Route
      exact
      path="/eventos/:idEvento/participantes"
      component={ParticipanteCadastro}
      isPrivate
    />
    <Route
      exact
      path="/eventos/:idEvento/participantes/:idParticipante"
      component={ParticipanteEdit}
      isPrivate
    />

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
    <Route
      exact
      path="/organizadores/eventos/:idEvento"
      component={OrganizadoresCadastro}
      isPrivate
    />
    <Route exact path="/usuarios" component={Usuarios} isPrivate />
    <Route exact path="/perfil" component={Perfil} isPrivate />
  </Switch>
);

export default Routes;
