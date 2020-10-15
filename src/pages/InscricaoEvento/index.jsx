import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../hooks/toast';
import * as EventosService from '../../services/eventos';
import * as ParticipantesService from '../../services/participantes';

import {
  Container,
  Title,
  ContainerDatas,
  Datas,
  ParticipantesContainer,
  ListaContainer
} from './styles';

function InscricaoEvento() {
  const [eventoState, setEventoState] = useState({});
  const [participantesState, setParticipantesState] = useState([]);
  const [participantesInscritos, setParticipantesInscritos] = useState([]);
  const { id: idEvento } = useParams();
  const { addToast } = useToast();
  const history = useHistory();

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const finalizarInscricoes = useCallback(() => {
    EventosService.realizarInscricao(idEvento, participantesInscritos).then(
      () => {
        addToast({
          type: 'success',
          title: 'Atenção!',
          description: 'Participantes inscritos com sucesso.'
        });
        redirect();
      }
    );
  }, [addToast, idEvento, participantesInscritos, redirect]);

  const addParticipante = useCallback(
    value => {
      // if (participantesInscritos.find(e => e.uuid === value.uuid)) {
      //   addToast({
      //     type: 'error',
      //     title: 'Atenção!',
      //     description: 'Participante já inscrito.'
      //   });
      //   return;
      // }

      const snippet = {
        codigo: value.codigo,
        nome: value.nome,
      };

      setParticipantesInscritos(part => [...part, snippet]);
      EventosService.adicionarOrganizador(idEvento, snippet)

    },
    [addToast, participantesInscritos]
  );

  const removeParticipante = useCallback(
    participanteId => {
      const newParticipantesList = participantesInscritos.filter(
        item => item.uuid !== participanteId
      );
      setParticipantesInscritos(newParticipantesList);
    },
    [participantesInscritos]
  );

  useEffect(() => {
    const getEvento = async () => {
      const eventoSnapshot = await EventosService.getEventoById(idEvento);
      const eventFound = eventoSnapshot.data();
      if (eventFound.participantes?.length > 0) {
        setParticipantesInscritos(eventFound.participantes);
      }
      setEventoState(eventFound);
    };

    const getParticipantes = async () => {
      const participantes = await ParticipantesService.getParticipantes();
      setParticipantesState(
        participantes.docs.map(doc => ({ ...doc.data(), uuid: doc.id })) ?? []
      );
    };

    getParticipantes();
    getEvento();
  }, [idEvento]);

  const dataIniFormatada = useMemo(() => formatDate(eventoState.dataInicial), [
    eventoState
  ]);
  const dataFimFormatada = useMemo(() => formatDate(eventoState.dataFinal), [
    eventoState
  ]);

  return (
    <>
      <Container>
        <Title>{eventoState.titulo}</Title>
        <p>{eventoState.descricao}</p>

        <ContainerDatas>
          <Datas>
            <div>Início</div>
            <span>{dataIniFormatada}</span>
          </Datas>
          <Datas>
            <div>Fim</div>
            <span>{dataFimFormatada}</span>
          </Datas>
        </ContainerDatas>
      </Container>

      <hr />

      <div
        style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 5 }}
      >
        <Button
          style={{
            backgroundColor: '#1BC5BD',
            borderColor: '#1BC5BD',
            color: 'white',
            fontWeight: 500,
            marginRight: 5
          }}
          variant="outlined"
          color="primary"
          onClick={() => finalizarInscricoes()}
        >
          Finalizar Inscrições
        </Button>
        <Button type="button" variant="outlined" onClick={() => redirect()}>
          Cancelar
        </Button>
      </div>

      <ParticipantesContainer>
        <ListaContainer>
          <h3>Lista Participantes</h3>
          <select name="tipo">
            {participantesState.map(tipo => (
              <option value={tipo.uuid} key={tipo.uuid}>
                {tipo.nome}
              </option>
            ))}
          </select>

          {participantesState.map(participante => (
            <li key={participante.uuid}>
              <strong>{participante.nome}</strong>
              <span> {participante.email} </span>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addParticipante(participante)}
                endIcon={<ArrowForwardIcon>Inscrever</ArrowForwardIcon>}
              >
                Inscrever
              </Button>
            </li>
          ))}
        </ListaContainer>
        <ListaContainer>
          <h3>Participantes Inscritos</h3>
          {participantesInscritos.map(
            participanteInscrito =>
              participanteInscrito.uuid && (
                <li key={participanteInscrito.uuid}>
                  <strong>{participanteInscrito.nome}</strong>
                  <span> {participanteInscrito.email} </span>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon>Remover</ArrowBackIcon>}
                    color="secondary"
                    onClick={() =>
                      removeParticipante(participanteInscrito.uuid)
                    }
                  >
                    Remover
                  </Button>
                </li>
              )
          )}
        </ListaContainer>
      </ParticipantesContainer>
    </>
  );
}

export default InscricaoEvento;
