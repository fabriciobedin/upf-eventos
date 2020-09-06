import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Participante from '../../../components/forms/Participante';
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
    <Participante
      participante={participante}
      formTitle="Edição de participante"
      idParticipante={id}
    />
  );
}

export default ParticipanteEdit;
