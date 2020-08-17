import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, AnimationContainer, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo_upf.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const SignIn = () => {
  const formRef = useRef(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!'),
          password: Yup.string().required('Senha obrigatória!')
        });
        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description:
            'Por favor, verifique se digitou suas credenciais corretamente.'
        });
      }
    },
    [addToast, signIn]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="UPF" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="forgot">Esqueci minha senha :(</Link>
          </Form>
          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
