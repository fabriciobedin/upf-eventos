import React, { useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { realizarInscricao } from '../../services/subeventos';
import * as ParticipantesService from '../../services/participantes';
import { useToast } from '../../hooks/toast';

function CustomToolbar({ selectedRows, displayData, setSelectedRows, statusModal }) {
  const { idEvento, idSubevento } = useParams();
  const { addToast } = useToast();

  const addParticipante = useCallback(() => {
    var promises = [];
    displayData.forEach(element => {
      const snippet = {
        codigo: element.data[0],
        nome: element.data[1],
        email: element.data[2],
        status: 'inscrito'
      };
      promises.push(realizarInscricao(idEvento, idSubevento, snippet));
      promises.push(
        ParticipantesService.atulizaInscricaoSubevento(
          idEvento,
          snippet.codigo,
          idSubevento
        )
      );
    });

    Promise.all(promises).then(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      addToast({
        type: 'success',
        description: 'Participantes inscrito com sucesso.'
      });
      setSelectedRows([]);
      statusModal(false);
    });
  }, [idEvento, idSubevento, setSelectedRows, addToast, displayData, statusModal]);

  return (
    <div style={{ marginRight: 24 }}>
      <Tooltip title={'Inscrever participantes selecionados'}>
        <Button
          variant="outlined"
          onClick={addParticipante}
          style={{
            backgroundColor: '#FDAE13',
            borderColor: '#FDAE13',
            color: 'white',
            fontWeight: 500
          }}
          endIcon={<GroupAddIcon />}
        >
          Inscrever participantes
        </Button>
      </Tooltip>
    </div>
  );
}

export default CustomToolbar;
