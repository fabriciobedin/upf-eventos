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

function InscricaoEvento() {
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
    // SubeventosService.realizarInscricao(
    //   idSubevento,
    //   participantesInscritos
    // ).then(() => {
    //   addToast({
    //     type: 'success',
    //     title: 'Atenção!',
    //     description: 'Participantes inscritos com sucesso.'
    //   });
    // });
  }, [history]);

  const addParticipante = useCallback(
    value => {
      if (participantesInscritos.find(e => e.uuid === value.uuid)) {
        addToast({
          type: 'error',
          title: 'Atenção!',
          description: 'Participante já inscrito.'
        });
        return;
      }

      const snippet = {
        uuid: value.uuid,
        codigo: value.codigo,
        nome: value.nome,
        email: value.email
      };

      setParticipantesInscritos(part => [...part, snippet]);
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

    ServiceEventos.getParticipantesByEvento(idEvento).then(eventos => {
      eventos.forEach(doc => {
        const participante = {
          ...doc.data(),
          uuid: doc.id
        };
        setParticipantesState(part => [...part, participante]);
      });
    });
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
