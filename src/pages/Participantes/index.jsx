import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import 'firebase/firestore';
import firebase from '../../services/firebase';

function Participantes() {
  const history = useHistory();
  const [participantes, setParticipantes] = useState([]);

  const handleEdit = useCallback(
    idParticipante => {
      history.push(`/participantes/${idParticipante}`);
    },
    [history]
  );

  const handleAdd = useCallback(() => {
    console.log('add');
    history.push('/participantes/cadastro');
  }, [history]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('participantes')
      .get()
      .then(parti => {
        parti.forEach(doc => {
          const participante = {
            ...doc.data(),
            uuid: doc.id
          };
          setParticipantes(part => [...part, participante]);
        });
      });
  }, []);

  return (
    <div>
      <Button type="button" variant="outlined" onClick={() => handleAdd()}>
        Incluir
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Participante</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>telefone</TableCell>
              <TableCell />
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
                <TableCell>{participante.telefone}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Participantes;
