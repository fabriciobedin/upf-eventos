import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
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
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Edit, Delete, PersonAdd } from '@material-ui/icons';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import { Container, Content, SubtitleContainer } from './styles';
import {
  getEventoById,
  update,
  getSubEventosByIdEvento
} from '../../../services/eventos';
import ParticipantesList from '../../../components/exibicao/Participante';
import { useToast } from '../../../hooks/toast';

const schema = Yup.object().shape({
  codigo: Yup.string().required('Código obrigatório!'),
  titulo: Yup.string().required('Título obrigatório!'),
  descricao: Yup.string().required('Descrição obrigatória!'),
  dataInicial: Yup.string().required('Data inicial obrigatória!'),
  dataFinal: Yup.string().required('Data Final obrigatória!')
});

function EventoForm() {
  const history = useHistory();
  const formRef = useRef(null);
  const [subeventos, setSubeventos] = useState([]);
  const [evento, setEvento] = useState({});
  const { addToast } = useToast();
  const { id } = useParams();

  const StyledTableCell = withStyles({
    body: {
      fontSize: 14
    }
  })(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  const handleAddParticipantes = useCallback(
    idEvento => {
      history.push(`/subevento/${idEvento}/participantes`);
    },
    [history]
  );

  useEffect(() => {
    getSubEventosByIdEvento(id).then(subEvento => {
      subEvento.forEach(doc => {
        const subevento = {
          ...doc.data(),
          uuid: doc.id
        };
        setSubeventos(sub => [...sub, subevento]);
      });
    });
  }, [id]);

  useEffect(() => {
    getEventoById(id).then(docSnapshot => {
      if (docSnapshot.exists) {
        formRef.current.setData(docSnapshot.data());
        setEvento(docSnapshot.data());
      }
    });
  }, [id]);

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const handleSubevento = useCallback(
    idEvento => {
      history.push(`/subevento/cadastro/${idEvento}`);
    },
    [history]
  );

  const handleEdit = useCallback(
    idEvento => {
      history.push(`/subevento/${idEvento}`);
    },
    [history]
  );

  const handleAddParticipantesEvento = useCallback(() => {
    history.push(`/eventos/${id}/participantes`);
  }, [history, id]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false
        });

        data.titulo = data.titulo.toUpperCase();
        update(id, data).then(() => {
          addToast({
            type: 'success',
            description: 'Evento alterado com sucesso.'
          });
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [addToast, id, redirect]
  );

  return (
    <Container>
      <h1>Edição de Evento:</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="titulo" placeholder="Título" />
          <Input name="descricao" placeholder="Descricao" />
          <p>Data Inicial:</p>
          <Input type="date" name="dataInicial" placeholder="Data" />
          <p>Data Final:</p>
          <Input type="date" name="dataFinal" placeholder="Data" />

          <Button type="submit">Salvar</Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>

        <SubtitleContainer>
          <h3>Subeventos:</h3>
          <button type="button" onClick={() => handleSubevento(id)}>
            Criar Subeventos
          </button>
        </SubtitleContainer>
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
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => handleEdit(subevento.uuid)}
                    >
                      <Edit fontSize="inherit" />
                    </IconButton>

                    <IconButton aria-label="delete" size="small">
                      <Delete fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleAddParticipantes(subevento.uuid)}
                    >
                      <PersonAdd fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <SubtitleContainer>
          <h3>Participantes:</h3>
          <button type="button" onClick={() => handleAddParticipantesEvento()}>
            Inscrever participantes
          </button>
        </SubtitleContainer>
        <ParticipantesList
          participantes={evento.participantes || []}
          hidePhone
          hideButtons
        />
      </Content>
    </Container>
  );
}

export default EventoForm;
