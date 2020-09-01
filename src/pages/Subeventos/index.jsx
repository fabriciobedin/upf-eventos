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
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../services/firebase';

const StyledTableCell = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function Subeventos() {
  const history = useHistory();
  const [subeventos, setSubeventos] = useState([]);

  const handleEdit = useCallback(
    idSubevento => {
      history.push(`/subevento/${idSubevento}`);
    },
    [history]
  );

  const handleAdd = useCallback(() => {
    console.log('add');
    history.push('/subevento/cadastro');
  }, [history]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('subeventos')
      .get()
      .then(eventos => {
        eventos.forEach(doc => {
          const subevento = {
            ...doc.data(),
            uuid: doc.id
          };
          setSubeventos(sub => [...sub, subevento]);
        });
      });
  }, []);

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => handleAdd()}
        >
          Novo Subevento
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Turno</StyledTableCell>
              <StyledTableCell>Data</StyledTableCell>
              <StyledTableCell>Hora Inicial</StyledTableCell>
              <StyledTableCell>Hora Final</StyledTableCell>
              <TableCell />
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {subeventos.map(subevento => (
              <StyledTableRow key={subevento.uuid}>
                <StyledTableCell component="th" scope="row">
                  {subevento.codigo}
                </StyledTableCell>
                <StyledTableCell>{subevento.descricao}</StyledTableCell>
                <StyledTableCell>{subevento.turno}</StyledTableCell>
                <StyledTableCell align="left" type="date">
                  {moment(subevento.dataInicial).format('D/MM/YYYY')}
                </StyledTableCell>
                <StyledTableCell>{subevento.horaInicial}</StyledTableCell>
                <StyledTableCell>{subevento.horaFinal}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(subevento.uuid)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Subeventos;
