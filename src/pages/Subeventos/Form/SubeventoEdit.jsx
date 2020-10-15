import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { Container, Content } from './Styles';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import { useToast } from '../../../hooks/toast';
import { getSubeventoById, update } from '../../../services/subeventos';

function SubeventosEdit() {
  const [checked] = React.useState(true);
  const history = useHistory();
  const formRef = useRef(null);
  const { idEvento, idSubevento } = useParams();
  const { addToast } = useToast();

  const turnos = [
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noite', label: 'Noite' }
  ];

  useEffect(() => {
    getSubeventoById(idEvento, idSubevento).then(docSnapshot => {
      if (docSnapshot.exists) {
        formRef.current.setData(docSnapshot.data());
      }
    });
  }, [idEvento, idSubevento]);

  const redirect = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        console.log('aqui edicao')
        update(idEvento, idSubevento, data).then(() => {
          addToast({
            type: 'success',
            title: 'Atenção!',
            description: 'Subevento alterado com sucesso.'
          });
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [addToast, idSubevento, redirect, idEvento]
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

export default SubeventosEdit;
