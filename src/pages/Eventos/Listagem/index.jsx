import {IconButton, Tooltip } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import options from '../../../utils/tableOptions';
import { getEventos, remove } from '../../../services/eventos';
import { formatDate } from '../../../utils/formatters';
import { useConfirm } from 'material-ui-confirm';
import { useToast } from '../../../hooks/toast';
import { deleteOptions } from '../../../utils/confirmationOptions';
import * as ParticipantesService from '../../../services/participantes';
import * as SubeventosService from '../../../services/subeventos';
import BreadCrumb from '../../../components/BreadCrumb';
import Grid from "@material-ui/core/Grid";
import Button from '../../../components/Button';

function EventosList() {
  const [eventos, setEventos] = useState([]);
  const history = useHistory();
  const confirmation = useConfirm();
  const { addToast } = useToast();
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const deleteOptionsEventos = {
    ...deleteOptions,
    description: 'Você confirma a exclusão do evento?'
  };

  const handleAdd = useCallback(() => {
    history.push('/eventos/cadastro');
  }, [history]);

  const handleImport = useCallback(() => {
    history.push('/eventos/importacao');
  }, [history]);

  const handleEdit = useCallback(
    idEvento => {
      history.push(`/eventos/${idEvento}`);
    },
    [history]
  );

  const verificaParticipantes = useCallback(async idEvento => {
    return ParticipantesService.getParticipantesByEvento(idEvento)
      .get()
      .then(data => {
        return data.size;
      });
  }, []);

  const verificaSubeventos = useCallback(async idEvento => {
    return SubeventosService.getSubEventos(idEvento).then(data => {
      return data.size;
    });
  }, []);

  const handleDelete = useCallback(
    async idEvento => {
      const participantes = await verificaParticipantes(idEvento);
      const subeventos = await verificaSubeventos(idEvento);
      console.log('participantes', participantes);
      console.log('subeventos', subeventos);

      if (participantes > 0 || subeventos) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        addToast({
          type: 'error',
          title: 'Atenão!',
          description:
            'Evento possui participantes/subeventos registrados. Não será possível remove-lo.'
        });
        return;
      }
      confirmation(deleteOptionsEventos)
        .then(() => {
          remove(idEvento).then(() => { });
        })
        .catch(() => { });
    },
    [addToast, confirmation, deleteOptionsEventos, verificaParticipantes, verificaSubeventos]
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
            style: { maxWidth: window.innerWidth > 1366 ? 900 : 600 }
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
                <IconButton
                  about="teste"
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(value)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      }
    ],
    [handleEdit, handleDelete]
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

  const crumbs = [
    {
      routeTo: '/eventos',
      name: 'Eventos'
    }
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
          <Grid container spacing={1}>
            <Grid item xs={2} >
              <Button className="primary" onClick={() => handleAdd()} style={{ height: 40}}>
                Cadastrar Evento
              </Button>
            </Grid>
            <Grid item xs={2} >
              <Button
                className="secondary"
                onClick={() => handleImport()}
                style={{ height: 40}}
              >
                Importar Evento
          </Button>
            </Grid>
            <Grid item xs={12} >
              <MUIDataTable
                title="Eventos"
                data={eventos}
                columns={columns}
                options={tableOptions}
              />
            </Grid>
          </Grid>
    </>
  );
}

export default EventosList;
