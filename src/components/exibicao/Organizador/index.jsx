import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function OrganizadoresList({ organizadores, hidePhone, hideButtons }) {
  const history = useHistory();
  const handleEdit = useCallback(
    idOrganizador => {
      history.push(`/organizadores/${idOrganizador}`);
    },
    [history]
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Participante</TableCell>
            <TableCell>Email</TableCell>
            {!hidePhone && <TableCell>telefone</TableCell>}
            {!hideButtons && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {organizadores.map(organizador => (
            <TableRow key={organizador.uuid}>
              <TableCell component="th" scope="row">
                {organizador.codigo}
              </TableCell>
              <TableCell>{organizador.nome}</TableCell>
              <TableCell>{organizador.email}</TableCell>
              {!hideButtons && (
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(organizador.uuid)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrganizadoresList;
