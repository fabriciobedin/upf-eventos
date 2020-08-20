import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import 'firebase/firestore';

import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import firebase from '../../../services/firebase';
import { Container, Content } from './Styles';

function SubeventosEdit() {
  const [checked] = React.useState(true);
  const history = useHistory();
  const formRef = useRef(null);
  const subeventoRef = firebase.firestore().collection('subeventos');
  const { id } = useParams();

  useEffect(() => {
    subeventoRef
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          formRef.current.setData(docSnapshot.data());
        }
      });
  }, [id, subeventoRef]);

  const redirect = useCallback(() => {
    history.push('/subeventos');
  }, [history]);

  const handleSubmit = useCallback(async data => {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current.setErrors(getValidationErrors(err));
      }
    }
  }, []);

  return (
    <Container>
      <h2>Edição de Subevento:</h2>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <input name="codigo" type="number" placeholder="Codigo" />

          <input name="descricao" placeholder="Descrição" />
          <select name="turno">
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>

          <TextField
            id="date"
            type="date"
            name="data"
            defaultValue={new Date()}
          />
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
          <TextField
            id="horaInicio"
            name="horaInicio"
            label="Horario Inicial"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.controlaFinal}
                name="controlaFinal"
                color="primary"
              />
            }
            label="Controlar Fim"
          />
          <TextField
            id="horaFim"
            name="horaFim"
            label="Horario Final"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
          <Button type="submit">Salvar</Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default SubeventosEdit;
