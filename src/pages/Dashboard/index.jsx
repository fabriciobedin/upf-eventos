import React from 'react';

import { Container, Menu, Content } from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Container>
        <Menu />
        <Content>
          <h1>Dashboard</h1>
          <Button type="submit" onClick={signOut}>
            SignOut
          </Button>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
