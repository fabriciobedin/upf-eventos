import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../hooks';
import { useToast } from '../../../hooks/toast';
import { Container, Content, ButtonContainer } from './styles';
import firebase from '../../../services/firebase';
import 'firebase/firestore';

import * as OrganizadorService from '../../../services/organizadores';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório!'),
  email: Yup.string()
    .required('Email obrigatório!')
    .email('Digite um email válido!')
});


function OrganizadorForm({ organizador, formTitle, idOrganizador }) {
  const { idEvento } = useParams();
  const history = useHistory();
  const formRef = useRef(null);
  const { addToast } = useToast();
  const db = firebase.firestore();

  useEffect(() => {
    if (organizador) {
      formRef.current.setData(idEvento, organizador);
    }
  }, [organizador, idEvento]);

  const redirect = useCallback(() => {
    history.push('/organizadores');
  }, [history]);

  const redirectEvento = useCallback(() => {
    history.push(`/eventos/${idEvento}`);
  }, [history, idEvento]);

  const submitNew = useCallback(
    async data => {
      OrganizadorService.submit(data).then(() => {
        const ref = db.collection('Users').doc()
        console.log(ref.id)  // prints the unique id
        ref.set({data})  // sets the contents of the doc using the id
        .then(() => {  // fetch the doc again and show its data
          ref.get().then(doc => {
            OrganizadorService.adicionarOrganizador(idEvento, ref.id).then(() => {
              addToast({
                type: 'success',
                description: 'Organizador vinculado com sucesso.'
              });
              redirectEvento();
            })
          })
        })
      });
    },
    [addToast, db, idEvento, redirectEvento]
  );

  const submitUpdate = useCallback(
    async data => {
      OrganizadorService.submit(data, idOrganizador).then(() => {
        addToast({
          type: 'success',
          description: 'Organizador alterado com sucesso.'
        });
      });
    },
    [addToast, idOrganizador]
  );

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        await schema.validate(data, {
          abortEarly: false
        });
        data.nome = data.nome.toUpperCase();
        if (organizador) {
          submitUpdate(data);
          return;
        }
        submitNew(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [organizador, submitNew, submitUpdate]
  );

  return (
    <Container>
      <h1>{formTitle}</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="nome" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />
          <hr />
          <ButtonContainer>
            <Button type="submit" onClick={() => handleSubmit()}>
              Salvar Organizador
            </Button>
            <Button onClick={redirect}>Cancelar</Button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  );
}

export default OrganizadorForm;
