import React, { useCallback, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, Content } from './Styles';

import Select from '../../../components/Select';

import 'firebase/firestore';
import firebase from '../../../services/firebase';

function Subeventos() {
  const formRef = useRef(null);
  const [checked] = React.useState(true);
  const history = useHistory();

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
        subeventoRef.add(data).then(() => {
          redirect();
        });
      } catch (err) {
        console.log(err);
      }
    },
    [subeventoRef, redirect]
  );

  return (
    <Container>
      <h2>Cadastro de Subevento:</h2>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="descricao" placeholder="Descrição" />
          <Select name="tipo">
            {turnos.map(tipo => (
              <option value={tipo.value} key={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </Select>
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
