import React, { useEffect, useState, useCallback } from 'react';
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
  const [evento, setEvento] = useState({});
  const [participantes, setParticipantes] = useState([]);
  const [participantesInscritos, setParticipantesInscritos] = useState([]);
  const { id: idEvento } = useParams();
  const { addToast } = useToast();

  const addParticipante = useCallback(
    value => {
      if (participantesInscritos.indexOf(value) > -1) {
        addToast({
          type: 'error',
          title: 'Atenção!',
          description: 'Participante já inscrito.'
        });
        return;
      }
      setParticipantesInscritos(part => [...part, value]);
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
    firebase
      .firestore()
      .collection('eventos')
      .doc(idEvento)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const eventFound = docSnapshot.data();
          eventFound.dataIniFormatada = formatDate(eventFound.dataInicial);
          eventFound.dataFimFormatada = formatDate(eventFound.dataFinal);
          setEvento(eventFound);
        }
      });

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
          setParticipantes(part => [...part, participante]);
        });
      });
  }, [idEvento]);

  return (
    <>
      <Container>
        <Title>{evento.titulo}</Title>
        <p>{evento.descricao}</p>

        <ContainerDatas>
          <Datas>
            <div>Início</div>
            <span>{evento.dataIniFormatada}</span>
          </Datas>
          <Datas>
            <div>Fim</div>
            <span>{evento.dataFimFormatada}</span>
          </Datas>
        </ContainerDatas>
      </Container>

      <hr />

      <ParticipantesContainer>
        <ListaContainer>
          {participantes.map(participante => (
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
