import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import 'firebase/firestore';
import firebase from '../../../services/firebase';

import { Container, Content } from './styles';

function EventoAdd() {
  const history = useHistory();
  const formRef = useRef(null);
  const eventoRef = firebase.firestore().collection('eventos');

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          codigo: Yup.string().required('Código obrigatório!'),
          titulo: Yup.string().required('Título obrigatório!'),
          descricao: Yup.string().required('Descrição obrigatória!'),
          dataInicial: Yup.string().required('Data inicial obrigatória!'),
          dataFinal: Yup.string().required('Data Final obrigatória!')
        });
        await schema.validate(data, {
          abortEarly: false
        });

        // const documento = await findByDoc(data.codigo, data.documento);

        eventoRef.add(data).then(() => {
          redirect();
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },

    [eventoRef, redirect]
  );

  return (
    <Container>
      <h1>Cadastro de Evento:</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="titulo" placeholder="Título" />
          <Input name="descricao" placeholder="Descrição" />
          <p>Data Inicial:</p>
          <Input type="date" name="dataInicial" />
          <p>Data Final:</p>
          <Input type="date" name="dataFinal" />
          <hr />

          <Button onClick={handleSubmit} type="submit">
            Salvar
          </Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default EventoAdd;
