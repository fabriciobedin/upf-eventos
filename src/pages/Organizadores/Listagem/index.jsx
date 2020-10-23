import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import { useConfirm } from 'material-ui-confirm';
import * as OrganizadoresService from '../../../services/organizadores';
import options from '../../../utils/tableOptions';
import { deleteOptions } from '../../../utils/confirmationOptions';
import { useToast } from '../../../hooks/toast';
import NoRecords from '../../../components/NoRecords';

function Organizadores({ idEvento }) {
  const history = useHistory();
  const confirmation = useConfirm();
  const { addToast } = useToast();
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };
  const deleteOptionsOrganizador = {
    ...deleteOptions,
    description: 'Você confirma a exclusão do organizador?'
  };

  let organizadores = [];

  const handleEdit = useCallback(
    idOrganizador => {
      history.push(`/eventos/${idEvento}/organizadores/${idOrganizador}`);
    },
    [history, idEvento]
  );

  const handleDelete = useCallback(
    async idOrganizador => {
      confirmation(deleteOptionsOrganizador)
        .then(() => {
          OrganizadoresService.remove(idEvento, idOrganizador).then(() => {});
        })
        .catch(() => {});
    },
    [addToast, confirmation, idEvento, deleteOptionsOrganizador]
  );

  useEffect(() => {
    OrganizadoresService.getOrganizadoresByEvento(idEvento).then(docSnapshot => {
      if (docSnapshot.exists) {
        for(let i=0; i < docSnapshot.data().organizadores.length; i++){
          OrganizadoresService.getOrganizadorById(docSnapshot.data().organizadores[i]).then(doc => {
            if(doc != undefined){
              organizadores = {
                list: [doc.data()],
              };
              console.log(organizadores)
            }
          });
        }
      }
    });

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
        name: 'name',
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
  console.log(organizadores.list)
  // if (organizadores.list.size > 0) {
    return (
      <MUIDataTable
        title="Organizadores"
        data={organizadores.list}
        columns={columns}
        options={tableOptions}
      />
    );
  // }

  return <NoRecords />;
}

export default Organizadores;
