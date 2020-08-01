import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router';

import { Wrapper, Logo } from './styles';
import logo from '../../assets/img/upf.png';
import firebase from '../../services/firebase';
import { AuthContext } from '../../services/auth';

const Login = () => {
  const handleLogin = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Logo src={logo} alt="Logo UPF" />

      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Seu e-mail" />
        <input type="password" name="password" placeholder="Sua senha" />
        <button type="submit">Entrar</button>
      </form>
    </Wrapper>
  );
};

export default withRouter(Login);
