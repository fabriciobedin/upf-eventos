import React, { useCallback, useRef } from 'react';
import { Button as ButtonMaterial } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Content,
  HeaderBox,
  FooterBox,
  UserImg,
  ContainerForm,
  BodyContent,
  Divider
} from './styles';
import Button from '../../components/Button';

function Perfil() {
  const { signOut, user, changePassword } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Nova senha obrigatória!'),
          password_confirm: Yup.string()
            .required('Confirmação de senha obrigatória!')
            .test('passwords-match', 'Senhas não coincidem!', value => {
              return data.password === value;
            }),
          old_password: Yup.string().required(
            'Confirmação de senha obrigatória!'
          )
        });
        await schema.validate(data, {
          abortEarly: false
        });
        await changePassword(data.old_password, data.password);

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Senha alterada com sucesso.'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro para realizar operação!',
          description: err.message
        });
      }
    },
    [addToast, changePassword]
  );

  const { REACT_APP_AVATAR_URL_DEFAULT } = process.env;

  return (
    <Container>
      <HeaderBox />
      <FooterBox />
      <Content>
        <UserImg avatar={user.avatarUrl ? user.avatarUrl : REACT_APP_AVATAR_URL_DEFAULT} />
        <BodyContent>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <ContainerForm>
            <h2>Redefinir minha senha</h2>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="old_password"
                type="password"
                placeholder="Senha atual"
                icon={FiLock}
              />
              <Input
                name="password"
                type="password"
                placeholder="Nova senha"
                icon={FiLock}
              />
              <Input
                name="password_confirm"
                icon={FiLock}
                type="password"
                placeholder="Confirmar Senha"
              />
              <Button type="submit" style={{ marginTop: 10 }}>
                Salvar
              </Button>
            </Form>
          </ContainerForm>
          <Divider />
          <ButtonMaterial
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={signOut}
          >
            Sair
          </ButtonMaterial>
        </BodyContent>
      </Content>
    </Container>
  );
}

export default Perfil;
