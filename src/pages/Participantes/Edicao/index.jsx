import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipanteForm from '../Form';
import { getParticipanteById } from '../../../services/participantes';
import BreadCrumb from '../../../components/BreadCrumb';

function ParticipanteEdit() {
  const [participante, setParticipante] = useState({});
  const { idEvento, idParticipante } = useParams();

  useEffect(() => {
    getParticipanteById(idEvento, idParticipante).then(docSnap => {
      setParticipante(docSnap.data());
    });
  }, [idEvento, idParticipante]);

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
      name: 'Editar Participante'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <ParticipanteForm
        participante={participante}
        formTitle="Edição de participante"
        idParticipante={idParticipante}
      />
    </>
  );
}

export default ParticipanteEdit;
