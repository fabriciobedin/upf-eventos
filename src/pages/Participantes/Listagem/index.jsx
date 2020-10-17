import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import { useConfirm } from 'material-ui-confirm';
import { remove } from '../../../services/participantes';
import options from '../../../utils/tableOptions';
import { deleteOptions } from '../../../utils/confirmationOptions';
import { getParticipantesByEvento } from '../../../services/eventos';

function Participantes({ idEvento }) {
  const history = useHistory();
  const confirmation = useConfirm();
  const [participantes, setParticipantes] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idParticipante => {
      history.push(`/eventos/${idEvento}/participantes/${idParticipante}`);
    },
    [history, idEvento]
  );

  const handleDelete = useCallback(
    idParticipante => {
      confirmation(deleteOptions)
        .then(() => {
          remove(idEvento, idParticipante).then(() => {});
        })
        .catch(() => {});
    },
    [confirmation, idEvento]
  );

  useEffect(() => {
    const unsubscribe = getParticipantesByEvento(idEvento).onSnapshot(
      participantesSnapshot => {
        setParticipantes(
          participantesSnapshot.docs.map(doc => ({
            ...doc.data(),
            uuid: doc.id
          }))
        );
      }
    );
    return () => unsubscribe();
  }, [idEvento]);

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
        label: 'Telefone',
        name: 'telefone',
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
            <>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => handleEdit(value)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(value)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </>
          )
        }
      }
    ],
    [handleDelete, handleEdit]
  );

  return (
    <MUIDataTable
      title="Participantes"
      data={participantes}
      columns={columns}
      options={tableOptions}
    />
  );
}

export default Participantes;
