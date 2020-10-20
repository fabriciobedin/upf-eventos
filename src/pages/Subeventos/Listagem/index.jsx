import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import MUIDataTable from 'mui-datatables';
import { PersonAdd } from '@material-ui/icons';
import { getSubEventos } from '../../../services/subeventos';
import { formatDate } from '../../../utils/formatters';

import options from '../../../utils/tableOptions';
import NoRecords from '../../../components/NoRecords';

function Subeventos({ idEvento }) {
  const history = useHistory();
  const [subeventos, setSubeventos] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idSubevento => {
      history.push(`/eventos/${idEvento}/subeventos/${idSubevento}`);
    },
    [history, idEvento]
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
                  <DeleteIcon fontSize="inherit" />
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
    [handleAddParticipantes, handleEdit]
  );

  useEffect(() => {
    getSubEventos(idEvento).then(eventos => {
      eventos.forEach(doc => {
        const subevento = {
          ...doc.data(),
          dataInicial: formatDate(doc.data().dataInicial),
          uuid: doc.id
        };
        setSubeventos(sub => [...sub, subevento]);
      });
    });
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
