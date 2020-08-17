import React from 'react';

import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/eventos">Eventos</Link>
      <Button type="submit" onClick={signOut}>
        SignOut
      </Button>
    </>
  );
};

export default Dashboard;
