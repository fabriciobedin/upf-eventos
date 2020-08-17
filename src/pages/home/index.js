import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './styles';
import firebase from '../../services/firebase';

export default function Home() {
  return (
    <Wrapper>
      <h1>Hello World :)</h1>
      <Link to="/eventos">Eventos</Link>
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sair
      </button>
    </Wrapper>
  );
}
