import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipanteForm from '../Form';
import { getParticipanteById } from '../../../services/participantes';

function ParticipanteEdit() {
  const [participante, setParticipante] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getParticipanteById(id).then(docSnap => {
      setParticipante(docSnap.data());
    });
  }, [id]);

  return (
    <ParticipanteForm
      participante={participante}
      formTitle="Edição de participante"
      idParticipante={id}
    />
  );
}

export default ParticipanteEdit;
