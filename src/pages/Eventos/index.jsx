import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getEventos } from '../../services/eventos';
import EventosList from '../../components/exibicao/Evento';

function Eventos() {
  const history = useHistory();
  const [eventos, setEventos] = useState([]);

  const handleAdd = useCallback(() => {
    history.push('/eventos/cadastro');
  }, [history]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getEventos();
      setEventos(data.docs.map(doc => ({ ...doc.data(), uuid: doc.id })) ?? []);
    };
    fetch();
  }, []);

  return (
    <div>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>
      <EventosList eventos={eventos} />
    </div>
  );
}

export default Eventos;
