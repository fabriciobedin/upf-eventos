import React, { useCallback } from 'react';
import { withRouter } from 'react-router';

import { Wrapper, Logo } from './styles';
import logo from '../../assets/img/upf.png';
import firebase from '../../services/firebase';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Wrapper>
      <Logo src={logo} alt="Logo UPF" />

      <form onSubmit={handleSignUp}>
        <input type="email" name="email" placeholder="Seu e-mail" />
        <input type="password" name="password" placeholder="Sua senha" />
        <button type="submit">Sign Up</button>
      </form>
    </Wrapper>
  );
};

export default withRouter(SignUp);
