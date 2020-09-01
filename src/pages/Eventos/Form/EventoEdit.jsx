import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import 'firebase/firestore';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import firebase from '../../../services/firebase';
import { Container, Content } from './styles';

function EventoEdit() {
  const history = useHistory();
  const formRef = useRef(null);
  const eventoRef = firebase.firestore().collection('eventos');
  const { id } = useParams();

  useEffect(() => {
    eventoRef
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          formRef.current.setData(docSnapshot.data());
        }
      });
  }, [id, eventoRef]);

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const handleSubevento = useCallback(
    idEvento => {
      history.push(`/subevento/cadastro/${idEvento}`);
    },
    [history]
  );

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

        data.titulo = data.titulo.toUpperCase();
        eventoRef
          .doc(id)
          .update(data)
          .then(() => {
            redirect();
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [id, eventoRef, redirect]
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

          <hr />

          <Button type="submit">Salvar</Button>
          <Button onClick={() => handleSubevento(id)}>Criar Subevento</Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default EventoEdit;
