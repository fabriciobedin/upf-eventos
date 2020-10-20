import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../hooks/toast';
import * as SubeventosService from '../../services/subeventos';
// import * as ParticipantesService from '../../services/participantes';
import * as ServiceEventos from '../../services/eventos';

import {
  Container,
  Title,
  ContainerDatas,
  Datas,
  ParticipantesContainer,
  ListaContainer
} from './styles';

function InscricaoSubevento() {
  const [eventoState, setEventoState] = useState({});
  const [participantesState, setParticipantesState] = useState([]);
  const [participantesInscritos, setParticipantesInscritos] = useState([]);
  const { idEvento, idSubevento } = useParams();
  const { addToast } = useToast();
  const dataIniFormatada = useRef(null);
  const horaIni = useRef(null);
  const horaFim = useRef(null);
  const subevento = useRef(null);
  const history = useHistory();

  const finalizarInscricoes = useCallback(() => {
    history.goBack();
  }, [history]);

  const addParticipante = useCallback(
    value => {
      if (participantesInscritos.find(e => e.uid === value.uid)) {
        addToast({
          type: 'error',
          title: 'Atenção!',
          description: 'Participante já inscrito.'
        });
        return;
      }

      const snippet = {
        uid: value.uid,
        codigo: value.codigo,
        nome: value.nome,
        email: value.email,
        status: 'inscrito'
      };

      SubeventosService.realizarInscricao(idEvento, idSubevento, snippet).then(
        () => {
          addToast({
            type: 'success',
            description: 'Participante inscrito com sucesso.'
          });
        }
      );

      setParticipantesInscritos(part => [...part, snippet]);
    },
    [addToast, idEvento, idSubevento, participantesInscritos]
  );

  const removeParticipante = useCallback(
    participanteId => {
      const newParticipantesList = participantesInscritos.filter(
        item => item.uid !== participanteId
      );
      setParticipantesInscritos(newParticipantesList);
    },
    [participantesInscritos]
  );

  useEffect(() => {
    SubeventosService.getSubeventoById(idEvento, idSubevento).then(
      docSnapshot => {
        if (docSnapshot.exists) {
          const subeventFound = docSnapshot.data();
          if (subeventFound.participantes?.length > 0) {
            setParticipantesInscritos(subeventFound.participantes);
          }
          dataIniFormatada.current = formatDate(subeventFound.dataInicial);
          horaIni.current = subeventFound.horaInicial;
          horaFim.current = subeventFound.horaFinal;
          subevento.current = subeventFound.descricao;
          setEventoState(subeventFound);
        }
      }
    );

    ServiceEventos.getParticipantesByEvento(idEvento).onSnapshot(
      participantesSnapshot => {
        setParticipantesState(
          participantesSnapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }))
        );
      }
    );
  }, [idEvento, idSubevento]);

  return (
    <>
      <Container>
        <Title>{eventoState.titulo}</Title>
        <p>{eventoState.descricao}</p>

        <ContainerDatas>
          <Datas>
            <div>Início</div>
            <span>{dataIniFormatada.current}</span>
          </Datas>
          <Datas>
            <div>Hora Início</div>
            <span>{horaIni.current}</span>
          </Datas>
          <Datas>
            <div>Hora Fim</div>
            <span>{horaFim.current}</span>
          </Datas>
        </ContainerDatas>
      </Container>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{
            backgroundColor: '#1BC5BD',
            borderColor: '#1BC5BD',
            color: 'white',
            fontWeight: 500
          }}
          variant="outlined"
          color="primary"
          onClick={() => finalizarInscricoes()}
        >
          Finalizar Inscrições
        </Button>
      </div>

      <ParticipantesContainer>
        <ListaContainer>
          <h3>Lista Participantes</h3>
          {participantesState.map(participante => (
            <li key={participante.uid}>
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
              participanteInscrito.uid && (
                <li key={participanteInscrito.uid}>
                  <strong>{participanteInscrito.nome}</strong>
                  <span> {participanteInscrito.email} </span>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon>Remover</ArrowBackIcon>}
                    color="secondary"
                    onClick={() => removeParticipante(participanteInscrito.uid)}
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

export default InscricaoSubevento;
