import React, { useCallback, useEffect, useRef } from 'react';
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
import Grid from "@material-ui/core/Grid";

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

  useEffect(() => {
    formRef.current.setData({ codigo: new Date().getTime() });
  }, []);

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
        <h1>Cadastro de Evento</h1>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item sm={6} lg={2}>
              <p>Código:</p>
                <Input name="codigo" placeholder="Código" type="number" />
              </Grid>
              <Grid item sm={6} lg={10}>
              <p>Título:</p>
                <Input name="titulo" placeholder="Título" />
              </Grid>
              <Grid item xs={12}>
                <p>Descrição:</p>
                <TextArea name="descricao" placeholder="Descricao" />
              </Grid>
              <Grid item xs={6} lg={2}>
                <p>Data Inicial:</p>
                <Input type="date" name="dataInicial" />
                </Grid>
                <Grid item xs={6} lg={2}>
                <p>Data Final:</p>
                <Input type="date" name="dataFinal" />
              </Grid>
              <Grid item xs={12}>
                <ButtonContainer>
                  <Button type="submit" className="primary">Salvar</Button>
                  <Button onClick={redirect} className="secondary">Cancelar</Button>
                </ButtonContainer>
              </Grid>
            </Grid>
          </Form>
        </Content>
      </Container>
    </>
  );
}

export default EventoAdd;
