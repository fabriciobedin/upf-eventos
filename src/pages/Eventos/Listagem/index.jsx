import { Button, IconButton, Tooltip } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import options from '../../../utils/tableOptions';
import { getEventos } from '../../../services/eventos';
import { formatDate } from '../../../utils/formatters';

function EventosList() {
  const [eventos, setEventos] = useState([]);
  const history = useHistory();
  const windowWidth = window.innerWidth;
  const tableOptions = {
    ...options,
    tableBodyHeight: windowWidth > 1366 ? '700px' : '450px',
    selectableRows: 'none'
  };

  const handleAdd = useCallback(() => {
    history.push('/eventos/cadastro');
  }, [history]);

  const handleEdit = useCallback(
    idEvento => {
      history.push(`/eventos/${idEvento}`);
    },
    [history]
  );

  const columns = useMemo(
    () => [
      {
        label: 'Título',
        name: 'titulo',
        options: {
          filter: true
        }
      },
      {
        label: 'Descrição',
        name: 'descricao',
        options: {
          filter: true,
          setCellProps: () => ({
            style: { maxWidth: '60%' }
          })
        }
      },
      {
        label: 'Início',
        name: 'dataInicial',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Fim',
        name: 'dataFinal',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Status',
        name: 'status',
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
            style: { minWidth: 80 }
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
              <Tooltip title="Remover">
                <IconButton about="teste" aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      }
    ],
    [handleEdit]
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await getEventos();
      setEventos(
        data.docs.map(doc => ({
          ...doc.data(),
          dataInicial: formatDate(doc.data().dataInicial),
          dataFinal: formatDate(doc.data().dataFinal),
          uuid: doc.id
        })) ?? []
      );
    };
    console.log(windowWidth);
    fetch();
  }, [windowWidth]);

  return (
    <>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>

      <MUIDataTable
        title="Eventos"
        data={eventos}
        columns={columns}
        options={tableOptions}
      />
    </>
  );
}

export default EventosList;
