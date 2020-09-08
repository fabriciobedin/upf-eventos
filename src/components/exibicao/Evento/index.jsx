import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Edit, Delete, PeopleAlt, EventAvailable } from '@material-ui/icons';
import { List, ButtonContainer, TitleContainer } from './styles';
import { formatDate } from '../../../utils/formatters';

function EventosList({ eventos }) {
  const [eventosState, setEventosState] = useState([]);
  const history = useHistory();

  const handleEdit = useCallback(
    idEvento => {
      history.push(`/eventos/editar/${idEvento}`);
    },
    [history]
  );

  const handleAddParticipantes = useCallback(
    idEvento => {
      history.push(`/eventos/${idEvento}/participantes`);
    },
    [history]
  );

  useEffect(() => {
    setEventosState(eventos);
  }, [eventos]);

  return (
    <List>
      {eventosState.map(e => (
        <li key={e.uuid}>
          <EventoBody evento={e} />
          <ButtonContainer>
            <IconButton
              aria-label="participantes"
              size="small"
              onClick={() => handleAddParticipantes(e.uuid)}
            >
              <PeopleAlt fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => handleEdit(e.uuid)}
            >
              <Edit fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small">
              <Delete fontSize="inherit" />
            </IconButton>
          </ButtonContainer>
        </li>
      ))}
    </List>
  );
}

const EventoBody = ({ evento }) => {
  const [numeroParticipantes, setNumeroParticipantes] = useState(0);
  const dataIniFormatada = useMemo(() => formatDate(evento.dataInicial), [
    evento.dataInicial
  ]);

  const dataFimFormatada = useMemo(() => formatDate(evento.dataFinal), [
    evento.dataFinal
  ]);
  useEffect(() => {
    if (evento.participantes) {
      setNumeroParticipantes(evento.participantes.length);
    }
  }, [evento.participantes]);

  return (
    <>
      <TitleContainer>
        <strong>{evento.titulo}</strong>
      </TitleContainer>
      <span>x Subeventos</span>
      <span>{numeroParticipantes} Participantes</span>
      <span>
        <EventAvailable fontSize="inherit" />
        {dataIniFormatada} - {dataFimFormatada}
      </span>
    </>
  );
};

export default EventosList;
