import React, { useCallback, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, Content, ButtonContainer } from './Styles';
import getValidationErrors from '../../../utils/getValidationErrors';

import Select from '../../../components/Select';

import 'firebase/firestore';
import firebase from '../../../services/firebase';
import { useToast } from '../../../hooks/toast';

function Subeventos() {
  const { addToast } = useToast();

  const formRef = useRef(null);
  const [checked] = React.useState(true);
  const history = useHistory();
  const { id } = useParams();

  const turnos = [
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noite', label: 'Noite' }
  ];

  const subeventoRef = firebase.firestore().collection('subeventos');

  const redirect = useCallback(() => {
    history.push('/subevento');
  }, [history]);

  const handleSubmit = useCallback(
    async data => {
      try {
        data.idEvento = id;
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          codigo: Yup.string().required('Código obrigatório!'),
          descricao: Yup.string().required('Descrição obrigatória!'),
          turno: Yup.string().required('Turno obrigatório'),
          dataInicial: Yup.string().required('Data inicial obrigatória!')
        });
        await schema.validate(data, {
          abortEarly: false
        });
        subeventoRef.add(data).then(() => {
          addToast({
            type: 'success',
            title: 'Atenção!',
            description: 'Subevento cadastrado com sucesso.'
          });
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [id, subeventoRef, addToast, redirect]
  );

  return (
    <Container>
      <h1>Cadastro de Subevento</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="descricao" placeholder="Descrição" />
          <br />
          <p>Data Inicial:</p>
          <Input type="date" name="dataInicial" />
          <br />
          <p>Turno do Subevento:</p>
          <Select name="turno">
            {turnos.map(turno => (
              <option value={turno.value} key={turno.value}>
                {turno.label}
              </option>
            ))}
          </Select>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.controlaInicio}
                name="controlaInicio"
                color="primary"
              />
            }
            label="Controlar Inicio"
          />
          <p>Hora Inicial:</p>
          <Input type="time" name="horaInicial" />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.controlaInicio}
                name="controlaFim"
                color="primary"
              />
            }
            label="Controlar Fim"
          />
          <p>Hora Final:</p>
          <Input type="time" name="horaFinal" />
          <hr />
          <ButtonContainer>
            <Button type="submit">Salvar</Button>
            <Button onClick={redirect}>Cancelar</Button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  );
}

export default Subeventos;
