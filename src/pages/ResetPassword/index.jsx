import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, AnimationContainer, Content, Background } from './styles';
import logo from '../../assets/logo_upf.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const ResetPassword = () => {
  const formRef = useRef(null);
  const { resetPassword } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!')
        });
        await schema.validate(data);
        await resetPassword(data.email);

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description:
            'Enviamos para o seu email um link para criação de nova senha.'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors({ email: err.message });
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro!',
          description: 'Por favor, verifique se digitou o email corretamente.'
        });
      }
    },
    [resetPassword, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="UPF" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinição de senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button type="submit">Enviar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
