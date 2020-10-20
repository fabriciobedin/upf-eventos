import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  ButtonContainer,
  Container,
  Content,
  SubtitleContainer
} from './styles';
import { getEventoById, update } from '../../../services/eventos';
import Participantes from '../../Participantes/Listagem';
import { useToast } from '../../../hooks/toast';
import TextArea from '../../../components/TextArea';
import Subeventos from '../../Subeventos/Listagem';

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
  const { addToast } = useToast();
  const { idEvento } = useParams();

  useEffect(() => {
    getEventoById(idEvento).then(docSnapshot => {
      if (docSnapshot.exists) {
        formRef.current.setData(docSnapshot.data());
      }
    });
  }, [idEvento]);

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const handleSubevento = useCallback(() => {
    history.push(`/eventos/${idEvento}/subeventos/cadastro`);
  }, [history, idEvento]);

  const handleAddParticipantesEvento = useCallback(() => {
    history.push(`/eventos/${idEvento}/participantes`);
  }, [history, idEvento]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false
        });

        data.titulo = data.titulo.toUpperCase();
        update(idEvento, data).then(() => {
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
    [addToast, idEvento, redirect]
  );

  return (
    <Container>
      <h1>Edição de Evento:</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="titulo" placeholder="Título" />
          <TextArea name="descricao" placeholder="Descricao" />
          <p>Data Inicial:</p>
          <Input type="date" name="dataInicial" placeholder="Data" />
          <p>Data Final:</p>
          <Input type="date" name="dataFinal" placeholder="Data" />

          <ButtonContainer>
            <Button type="submit">Salvar</Button>
            <Button onClick={redirect}>Cancelar</Button>
          </ButtonContainer>
        </Form>
      </Content>
      <hr style={{ marginTop: 10, marginBottom: 10 }} />
      <SubtitleContainer>
        <h3>Subeventos:</h3>
        <button type="button" onClick={() => handleSubevento()}>
          Criar Subeventos
        </button>
      </SubtitleContainer>
      <Subeventos idEvento={idEvento} />
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
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
                <StyledTableCell>{subevento.descricao}</StyledTableCell>
                <StyledTableCell>{subevento.turno}</StyledTableCell>
                <StyledTableCell align="left" type="date">
                  {moment(subevento.dataInicial).format('D/MM/YYYY')}
                </StyledTableCell>
                <StyledTableCell>{subevento.horaInicial}</StyledTableCell>
                <StyledTableCell>{subevento.horaFinal}</StyledTableCell>
                <TableCell style={{ minWidth: 110, textAlign: 'center' }}>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEditSubevento(subevento.uuid)}
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
      </TableContainer> */}
      <SubtitleContainer>
        <h3>Participantes do evento:</h3>
        <button type="button" onClick={() => handleAddParticipantesEvento()}>
          Inscrever participantes
        </button>
      </SubtitleContainer>
      <Participantes idEvento={idEvento} />
    </Container>
  );
}

export default EventoForm;
