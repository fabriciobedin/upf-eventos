import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import { useConfirm } from 'material-ui-confirm';
import * as ParticipantesService from '../../services/participantes';
import options from '../../utils/tableOptions';
import { deleteOptions } from '../../utils/confirmationOptions';
import NoRecords from '../../components/NoRecords';

function ParticipantesSubevento({ idEvento, idSubevento }) {
  const [participantes, setParticipantes] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none',

  };

  useEffect(() => {
    const unsubscribe = ParticipantesService.getParticipantesSubevento(
      idEvento,
      idSubevento
    ).onSnapshot(participantesSnapshot => {
      setParticipantes(
        participantesSnapshot.docs.map(doc => ({
          ...doc.data(),
          uuid: doc.id
        }))
      );
    });
    return () => unsubscribe();
  }, [idEvento]);

  const handleDelete = () => {};

  const columns = useMemo(
    () => [
      {
        label: 'Código',
        name: 'codigo',
        options: {
          filter: true
        }
      },
      {
        label: 'Nome',
        name: 'nome',
        options: {
          filter: true
        }
      },
      {
        label: 'E-mail',
        name: 'email',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: 'uuid',
        label: 'Ações',
        options: {
          filter: false,
          sort: false,
          customBodyRender: value => (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDelete(value)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )
        }
      }
    ],
    [handleDelete]
  );

  if (participantes.length > 0) {
    return (
      <MUIDataTable
        title={'Participantes inscritos neste subevento'}
        data={participantes}
        columns={columns}
        options={tableOptions}
      />
    );
  }

  return <NoRecords message="Nenhum participante inscrito."  />;
}

export default ParticipantesSubevento;
