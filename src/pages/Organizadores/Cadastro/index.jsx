import React from 'react';
import OrganizadorForm from '../Form';
import BreadCrumb from '../../../components/BreadCrumb';

function OrganizadorCadastro() {

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
      name: 'Organizador'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <OrganizadorForm formTitle="Inclusão de Organizador" />
    </>
  );
}

export default OrganizadorCadastro;
