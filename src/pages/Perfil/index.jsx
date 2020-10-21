import React from 'react';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Container, Content, HeaderBox, FooterBox, UserImg } from './styles';
import { useAuth } from '../../hooks/auth';


function Perfil() {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderBox />
      <FooterBox />
      <Content>
        <UserImg />
        <p style={{ marginTop: 10 }}>{user.user.user.displayName}</p>
        <p>{user.user.user.email}</p>

        <Button style={{ marginTop: 30 }} color="secondary" startIcon={<ExitToAppIcon />} onClick={signOut}>
          Sair
        </Button>
      </Content>
    </Container>
  );
};

export default Perfil;
