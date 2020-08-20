import React, { useCallback, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, Content } from './Styles';
import { useToast } from '../../../hooks/toast';

import 'firebase/firestore';
import firebase from '../../../services/firebase';

import getValidationErrors from '../../../utils/getValidationErrors';

function Subeventos() {
  const formRef = useRef(null);
  const [checked] = React.useState(true);
  const history = useHistory();

  const { addToast } = useToast();
  const subeventoRef = firebase.firestore().collection('subeventos');

  const redirect = useCallback(() => {
    history.push('/subevento');
  }, [history]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          codigo: Yup.string().required('Código obrigatório!'),
          descricao: Yup.string().required('Descrição obrigatória!'),
          turno: Yup.string().required('Turno obrigatório!'),
          data: Yup.string().required('Data obrigatória!')
        });
        await schema.validate(data, {
          abortEarly: false
        });

        subeventoRef.add(data).then(() => {
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Por favor, verifique se digitou os dados corretamente.'
        });
      }
    },
    [addToast, subeventoRef, redirect]
  );

  return (
    <Container>
      <h2>Cadastro de Subevento:</h2>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="descricao" placeholder="Descrição" />
          <select name="turno">
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>
          <p>Data Inicial:</p>
          <Input type="date" name="dataInicial" />
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

          <Button type="submit">Salvar</Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Subeventos;
