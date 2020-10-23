import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { formatDate } from '../../utils/formatters';
import * as SubeventosService from '../../services/subeventos';
import BreadCrumb from '../../components/BreadCrumb';

import { Container, Title, ContainerDatas, Datas } from './styles';
import ParticipantesSubevento from '../ParticipantesSubevento';
import SelecaoParticipantes from './SelecaoParticipantes';

function InscricaoSubevento() {
  const [eventoState, setEventoState] = useState({});
  const [participantesInscritos, setParticipantesInscritos] = useState([]);
  const [open, setOpen] = useState(false);
  const { idEvento, idSubevento } = useParams();
  const dataIniFormatada = useRef(null);
  const horaIni = useRef(null);
  const horaFim = useRef(null);
  const subevento = useRef(null);
  const history = useHistory();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

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
  }, [idEvento, idSubevento]);

  const crumbs = [
    {
      routeTo: '/eventos',
      name: 'Eventos'
    },
    {
      routeTo: '',
      name: 'Editar evento'
    },
    {
      routeTo: '',
      name: 'Inscrição Subevento'
    }
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
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

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding:10 }}>
        <Button
          style={{
            backgroundColor: '#1BC5BD',
            borderColor: '#1BC5BD',
            color: 'white',
            fontWeight: 500
          }}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Inscrever participantes
        </Button>
      </div>

      <ParticipantesSubevento idEvento={idEvento} idSubevento={idSubevento} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="form-dialog-title">
          Inscrição de participantes
        </DialogTitle>
        <DialogContent>
          <SelecaoParticipantes
            idEvento={idEvento}
            idSubevento={idSubevento}
            title="Participantes do evento"
            selectable={true}
            statusModal={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InscricaoSubevento;
