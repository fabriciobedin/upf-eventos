import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { getParticipantes } from '../../../services/participantes';
import ParticipantesList from '../../../components/tables/Participante';

function Participantes() {
  const history = useHistory();
  const [participantes, setParticipantes] = useState([]);

  const handleAdd = useCallback(() => {
    history.push('/participantes/cadastro');
  }, [history]);

  useEffect(() => {
    getParticipantes().then(docSnapshot => {
      docSnapshot.forEach(doc => {
        const participante = {
          ...doc.data(),
          uuid: doc.id
        };
        setParticipantes(part => [...part, participante]);
      });
    });
  }, []);

  return (
    <div>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>
      <ParticipantesList participantes={participantes} />
    </div>
  );
}

export default Participantes;
