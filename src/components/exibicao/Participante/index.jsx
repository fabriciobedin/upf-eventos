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

function ParticipantesList({ participantes, hidePhone, hideButtons }) {
  const history = useHistory();
  const handleEdit = useCallback(
    idParticipante => {
      history.push(`/participantes/${idParticipante}`);
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
          {participantes.map(participante => (
            <TableRow key={participante.uuid}>
              <TableCell component="th" scope="row">
                {participante.codigo}
              </TableCell>
              <TableCell>{participante.nome}</TableCell>
              <TableCell>{participante.email}</TableCell>
              {!hidePhone && <TableCell>{participante.telefone}</TableCell>}
              {!hideButtons && (
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(participante.uuid)}
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

export default ParticipantesList;
