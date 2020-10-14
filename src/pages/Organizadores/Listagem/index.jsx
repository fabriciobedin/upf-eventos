import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import MUIDataTable from 'mui-datatables';

import { getOrganizadores } from '../../../services/organizadores';

import options from '../../../utils/tableOptions';

function Organizadores() {
  const history = useHistory();
  const [organizadores, setOrganizadores] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'none'
  };

  const handleEdit = useCallback(
    idOrganizador => {
      history.push(`/organizadores/${idOrganizador}`);
    },
    [history]
  );

  const columns = useMemo(
    () => [
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
    history.push('/organizadores/cadastro');
  }, [history]);

  useEffect(() => {
    getOrganizadores().then(docSnapshot => {
      setOrganizadores(
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
        title="Organizadores"
        data={organizadores}
        columns={columns}
        options={tableOptions}
      />
    </>
  );
}

export default Organizadores;
