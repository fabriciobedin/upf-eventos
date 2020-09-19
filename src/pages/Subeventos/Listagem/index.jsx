import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import MUIDataTable from 'mui-datatables';
import { getSubEventos } from '../../../services/subeventos';
import { formatDate } from '../../../utils/formatters';

import options from '../../../utils/tableOptions';

function SubEventos() {
  const history = useHistory();
  const [subeventos, setSubeventos] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idSubevento => {
      history.push(`/subevento/${idSubevento}`);
    },
    [history]
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
          customBodyRender: value => (
            <>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => handleEdit(value)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </>
          )
        }
      }
    ],
    [handleEdit]
  );

  const handleAdd = useCallback(() => {
    history.push('/participantes/cadastro');
  }, [history]);

  useEffect(() => {
    getSubEventos().then(eventos => {
      eventos.forEach(doc => {
        const subevento = {
          ...doc.data(),
          dataInicial: formatDate(doc.data().dataInicial),
          uuid: doc.id
        };
        setSubeventos(sub => [...sub, subevento]);
      });
    });
  }, []);

  return (
    <>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>

      <MUIDataTable
        title="Subeventos"
        data={subeventos}
        columns={columns}
        options={tableOptions}
      />
    </>
  );
}

export default SubEventos;
