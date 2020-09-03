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
import { Edit, Delete, PersonAdd } from '@material-ui/icons';
import 'firebase/firestore';
import firebase from '../../services/firebase';

function Eventos() {
  const history = useHistory();
  const [eventos, setEventos] = useState([]);

  const handleEdit = useCallback(
    idEvento => {
      history.push(`/eventos/editar/${idEvento}`);
    },
    [history]
  );

  const handleAdd = useCallback(() => {
    history.push('/eventos/cadastro');
  }, [history]);

  const handleAddParticipantes = useCallback(idEvento => {
    history.push(`/eventos/${idEvento}/participantes`);
  }, [history]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('eventos')
      .get()
      .then(e => {
        e.forEach(doc => {
          const evento = {
            ...doc.data(),
            uuid: doc.id
          };
          setEventos(part => [...part, evento]);
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
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data Inicial</TableCell>
              <TableCell>Data Final</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map(evento => (
              <TableRow key={evento.uuid}>
                <TableCell component="th" scope="row">
                  {evento.codigo}
                </TableCell>
                <TableCell>{evento.titulo}</TableCell>
                <TableCell>{evento.descricao}</TableCell>
                <TableCell>{evento.dataInicial}</TableCell>
                <TableCell>{evento.dataFinal}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(evento.uuid)}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>

                  <IconButton aria-label="delete" size="small">
                    <Delete fontSize="inherit" />
                  </IconButton>
                  <Button
                    title="Adicionar participantes"
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddParticipantes(evento.uuid)}
                    startIcon={<PersonAdd />}
                  >
                    Participantes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Eventos;
