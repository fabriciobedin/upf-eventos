import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipanteForm from '../Form';
import { getParticipanteById } from '../../../services/participantes';

function ParticipanteEdit() {
  const [participante, setParticipante] = useState({});
  const { idEvento, idParticipante } = useParams();

  useEffect(() => {
    getParticipanteById(idEvento, idParticipante).then(docSnap => {
      setParticipante(docSnap.data());
    });
  }, [idEvento, idParticipante]);

  return (
    <ParticipanteForm
      participante={participante}
      formTitle="Edição de participante"
      idParticipante={idParticipante}
    />
  );
}

export default ParticipanteEdit;
