import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../hooks';
import { useToast } from '../../../hooks/toast';
import { Container, Content, ButtonContainer } from './styles';

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

  useEffect(() => {
    if (organizador) {
      formRef.current.setData(idEvento, organizador);
    }
  }, [organizador]);

  const redirect = useCallback(() => {
    history.push('/organizadores');
  }, [history]);

  const submitNew = useCallback(
    async data => {
      OrganizadorService.submit(data).then(() => {
        console.log('d', data)
        OrganizadorService.cadastrarOrganizador(idEvento, data.id).then(() => {
          addToast({
            type: 'success',
            description: 'Organizador cadastrado com sucesso.'
          });
        })
      });
    },
    [addToast, redirect]
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
    [addToast, idOrganizador, redirect]
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
          <Input name="senha" placeholder="Senha" />
          <hr />
          <ButtonContainer>
            <Button type="submit" onClick={() => handleSubmit()}>
              Salvar
            </Button>
            <Button onClick={redirect}>Cancelar</Button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  );
}

export default OrganizadorForm;
