import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import BreadCrumb from '../../../components/BreadCrumb';
import options from '../../../utils/tableOptions';
import { getUsers } from '../../../services/usuarios';
import { useToast } from '../../../hooks/toast';
import Grid from "@material-ui/core/Grid";
import Button from '../../../components/Button';

function Usuarios() {
  const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const { addToast } = useToast();
  const tableOptions = {
    ...options,
    tableBodyHeight: window.innerWidth > 1366 ? '650px' : '450px',
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idUsuario => {
      history.push(`/usuarios/${idUsuario}`);
    },
    [history]
  );

  const columns = useMemo(
    () => [
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
        name: 'uid',
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
    addToast({
      type: 'error',
      description: 'Feature ainda não implementada.'
    });
  }, [addToast]);

  useEffect(() => {
    getUsers().then(docSnapshot => {
      setUsuarios(
        docSnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }))
      );
    });
  }, []);


  const crumbs = [
    {
      routeTo: '/usuarios',
      name: 'Usuários'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Button type="button" className="primary" onClick={() => handleAdd()} style={{ height: 40}}>
            Cadastrar Usuário
      </Button>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Usuários"
            data={usuarios}
            columns={columns}
            options={tableOptions}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Usuarios;
