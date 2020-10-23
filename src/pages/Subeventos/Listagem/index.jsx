import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteOptions } from '../../../utils/confirmationOptions';
import MUIDataTable from 'mui-datatables';
import { PersonAdd } from '@material-ui/icons';
import { formatDate } from '../../../utils/formatters';
import { useToast } from '../../../hooks/toast';
import options from '../../../utils/tableOptions';
import NoRecords from '../../../components/NoRecords';
import { useConfirm } from 'material-ui-confirm';
import { getSubEventosSnapshot, getParticipantesInscritosSubEvento, remove } from '../../../services/subeventos';

function Subeventos({ idEvento }) {
  const history = useHistory();
  const { addToast } = useToast();
  const [subeventos, setSubeventos] = useState([]);
  const confirmation = useConfirm();
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };
  const deleteOptionsSubEvento = {
    ...deleteOptions,
    description: 'Você confirma a exclusão do subevento?'
  };

  const handleEdit = useCallback(
    idSubevento => {
      history.push(`/eventos/${idEvento}/subeventos/${idSubevento}`);
    },
    [history, idEvento]
  );

  const verificaInscritosSubEvento = useCallback(async idSubevento => {
    return getParticipantesInscritosSubEvento(idEvento, idSubevento).then(data => {
      return data.size;
    });
  }, [idEvento]);

  const handleDelete = useCallback(
    async idSubevento => {
      //verificar se tem inscritos
      const inscritos = await verificaInscritosSubEvento(idSubevento);
      if (inscritos > 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        addToast({
          type: 'error',
          title: 'Atenção!',
          description:
            'Não é possível excluir subevento, pois possui participantes inscritos!'
        });
        return;
      }
      confirmation(deleteOptionsSubEvento)
        .then(() => {
          remove(idEvento, idSubevento)
            .then(() => { })
            .catch(() => {
              window.scrollTo({ top: 0, behavior: 'auto' });
              addToast({
                type: 'error',
                title: 'Atenção!',
                description:
                  'Algo de errado ocorreu e não foi possível excluir subevento!!'
              });
            });
        })
        .catch(() => { });
    },
    [addToast, confirmation, idEvento, verificaInscritosSubEvento, deleteOptionsSubEvento]
  );

  const handleAddParticipantes = useCallback(
    idSubevento => {
      history.push(
        `/eventos/${idEvento}/subeventos/${idSubevento}/participantes/cadastro`
      );
    },
    [history, idEvento]
  );

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
        label: 'Descrição',
        name: 'descricao',
        options: {
          filter: true
        }
      },
      {
        label: 'Turno',
        name: 'turno',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Data',
        name: 'dataInicial',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Hora inicial',
        name: 'horaInicial',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Hora final',
        name: 'horaFinal',
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
          setCellProps: () => ({
            style: { minWidth: 105 }
          }),
          customBodyRender: value => (
            <>
              <Tooltip title="Editar">
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleEdit(value)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir subevento">
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon
                    fontSize="inherit"
                    onClick={() => handleDelete(value)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Inscrever participantes">
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleAddParticipantes(value)}
                >
                  <PersonAdd fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      }
    ],
    [handleAddParticipantes, handleEdit, handleDelete]
  );

  useEffect(() => {
    const subeventosList = getSubEventosSnapshot(idEvento).onSnapshot(
      subeventosSnapshot => {
        setSubeventos(
          subeventosSnapshot.docs.map(doc => ({
            ...doc.data(),
            dataInicial: formatDate(doc.data().dataInicial),
            uuid: doc.id
          }))
        );
      }
    );
    return () => subeventosList();
  }, [idEvento]);

  if (subeventos.length > 0) {
    return (
      <MUIDataTable
        title="Subeventos"
        data={subeventos}
        columns={columns}
        options={tableOptions}
      />
    );
  }

  return <NoRecords message="Subeventos ainda não cadastrados." />;
}

export default Subeventos;
