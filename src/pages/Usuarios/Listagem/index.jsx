import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';

import options from '../../../utils/tableOptions';
import { getUsers } from '../../../services/usuarios';
import { useToast } from '../../../hooks/toast';

function Usuarios() {
  const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const { addToast } = useToast();
  const tableOptions = {
    ...options,
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

  return (
    <>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>

      <MUIDataTable
        title="Usuários"
        data={usuarios}
        columns={columns}
        options={tableOptions}
      />
    </>
  );
}

export default Usuarios;
