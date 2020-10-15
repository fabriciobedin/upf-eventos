import { Button, IconButton } from '@material-ui/core';
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
  const tableOptions = {
    ...options,
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
          filter: true
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
    fetch();
  }, []);

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
