import React from 'react';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <Button type="submit" onClick={signOut}>
        SignOut
      </Button>
    </>
  );
};

export default Dashboard;
