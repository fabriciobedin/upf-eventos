import React from 'react';
import ParticipanteForm from '../Form';
import BreadCrumb from '../../../components/BreadCrumb';

function ParticipanteCadastro() {
  const crumbs = [
    {
      routeTo: '/eventos',
      name: 'Eventos'
    },
    {
      routeTo: '',
      name: 'Editar evento'
    },
    {
      routeTo: '',
      name: 'Participante'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <ParticipanteForm formTitle="Inclusão de Participante" />
    </>
  );
}

export default ParticipanteCadastro;
