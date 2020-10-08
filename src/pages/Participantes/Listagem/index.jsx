import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import { useConfirm } from 'material-ui-confirm';
import { getParticipantes, remove } from '../../../services/participantes';
import options from '../../../utils/tableOptions';

function Participantes() {
  const history = useHistory();
  const confirmation = useConfirm();
  const [participantes, setParticipantes] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idParticipante => {
      history.push(`/participantes/${idParticipante}`);
    },
    [history]
  );

  const handleDelete = useCallback(idParticipante => {
    confirmation({
      description: 'Você confirma a exclusão do participante?',
      title: 'Exclusão de participante',
      confirmationButtonProps: {
        variant: 'contained',
        color: 'secondary',
        startIcon: <DeleteIcon />
      },
      confirmationText: 'Confirmar',
      cancellationText: 'Cancelar',
      dialogProps: { disableBackdropClick: true }
    })
    .then(() => {
      remove(idParticipante).then(() => {});
    })
    .catch(() => {});
  }, []);

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

  const handleAdd = useCallback(() => {
    history.push('/participantes/cadastro');
  }, [history]);

  useEffect(() => {
    getParticipantes().then(docSnapshot => {
      setParticipantes(
        docSnapshot.docs.map(doc => ({ ...doc.data(), uuid: doc.id }))
      );
    });
  }, []);

  return (
    <>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>

      <MUIDataTable
        title="Participantes"
        data={participantes}
        columns={columns}
        options={tableOptions}
      />
    </>
  );
}

export default Participantes;
