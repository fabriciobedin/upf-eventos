import React, { useCallback, useRef } from 'react';
import Button from '../../components/Button';
import { Button as ButtonMaterial } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import { Container, Content, HeaderBox, FooterBox, UserImg, ButtonContainer } from './styles';
import { useAuth } from '../../hooks/auth';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function Perfil() {
  const { signOut, user, changePassword } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Nova senha obrigatória!'),
          password_confirm:
            Yup
              .string()
              .required('Confirmação de senha obrigatória!')
              .test('passwords-match', 'Senhas não coincidem!', function (value) {
                return this.parent.password === value;
              }),
          old_password: Yup.string().required('Confirmação de senha obrigatória!'),
        });
        await schema.validate(data, {
          abortEarly: false
        });

        await changePassword(data.old_password, data.password);

        handleClose();
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description:
            'Senha alterada com sucesso.'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
          return;
        }

        handleClose();
        addToast({
          type: 'error',
          title: 'Erro para realizar operação!',
          description:
            err.message
        });
      }
    },
    [addToast, changePassword]
  );

  return (
    <Container>
      <HeaderBox />
      <FooterBox />
      <Content>
        <UserImg />
        <p style={{ marginTop: 10 }}>{user.user.user.name}</p>
        <p>{user.user.user.email}</p>
        <ButtonContainer>
          <ButtonMaterial color="primary" startIcon={<LockIcon />} onClick={handleClickOpen}>
            Trocar Minha senha
          </ButtonMaterial>
          <ButtonMaterial color="secondary" startIcon={<ExitToAppIcon />} onClick={signOut}>
            Sair
          </ButtonMaterial>
        </ButtonContainer>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Defina sua nova senha de acesso</DialogTitle>
          <DialogContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="old_password" type="password" placeholder="Senha atual" icon={FiLock} />
              <Input name="password" type="password" placeholder="Nova senha" icon={FiLock} />
              <Input name="password_confirm" icon={FiLock} type="password" placeholder="Confirmar Senha" />
              <Button type="submit" style={{ marginTop: 30 }}>
                Salvar
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      </Content>
    </Container>
  );
};

export default Perfil;
