import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import { ButtonContainer, Container, Content } from './styles';
import { submit } from '../../../services/eventos';
import { useToast } from '../../../hooks/toast';
import TextArea from '../../../components/TextArea';
import BreadCrumb from '../../../components/BreadCrumb';

function EventoAdd() {
  const history = useHistory();
  const formRef = useRef(null);
  const { addToast } = useToast();

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

        submit(data).then(() => {
          addToast({
            type: 'success',
            description: 'Evento registrado com sucesso.'
          });
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },

    [addToast, redirect]
  );

  const crumbs = [
    {
      routeTo: '/eventos',
      name: 'Eventos'
    },
    {
      routeTo: '/eventos/cadastro',
      name: 'Cadastro'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <Container>
        <h1>Cadastro de Evento:</h1>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="codigo" placeholder="Código" type="number" />
            <Input name="titulo" placeholder="Título" />
            <TextArea name="descricao" placeholder="Descricao" />
            <p>Data Inicial:</p>
            <Input type="date" name="dataInicial" />
            <p>Data Final:</p>
            <Input type="date" name="dataFinal" />
            <hr />

            <ButtonContainer>
              <Button type="submit">Salvar</Button>
              <Button onClick={redirect}>Cancelar</Button>
            </ButtonContainer>
          </Form>
        </Content>
      </Container>
    </>
  );
}

export default EventoAdd;
