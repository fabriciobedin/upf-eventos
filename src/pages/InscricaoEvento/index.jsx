import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button } from '@material-ui/core';
import 'firebase/firestore';
import firebase from '../../services/firebase';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../hooks/toast';

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
  const dataIniFormatada = useRef(null);
  const dataFimFormatada = useRef(null);

  const finalizarInscricoes = useCallback(() => {
    firebase
      .firestore()
      .collection('eventos')
      .doc(idEvento)
      .update({
        participantes: participantesInscritos
      })
      .then(() => {
        addToast({
          type: 'success',
          title: 'Atenção!',
          description: 'Participantes inscritos com sucesso.'
        });
      });
  }, [addToast, idEvento, participantesInscritos]);

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
    const buscaEvento = async () => {
      firebase
        .firestore()
        .collection('eventos')
        .doc(idEvento)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            const eventFound = docSnapshot.data();
            if (eventFound.participantes?.length > 0) {
              setParticipantesInscritos(eventFound.participantes);
            }

            dataIniFormatada.current = formatDate(eventFound.dataInicial);
            dataFimFormatada.current = formatDate(eventFound.dataFinal);
            setEventoState(eventFound);
          }
        });
    };
    const buscaParticipantes = async () => {
      firebase
        .firestore()
        .collection('participantes')
        .get()
        .then(eventos => {
          eventos.forEach(doc => {
            const participante = {
              ...doc.data(),
              uuid: doc.id
            };
            setParticipantesState(part => [...part, participante]);
          });
        });
    };

    buscaParticipantes();
    buscaEvento();
  }, [idEvento]);

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
            <div>Fim</div>
            <span>{dataFimFormatada.current}</span>
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
          <h3>Lista Partticipantes</h3>
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
