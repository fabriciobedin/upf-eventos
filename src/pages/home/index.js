import React from 'react';
import { Wrapper } from './styles';
import firebase from '../../services/firebase';

export default function Home() {
  return (
    <Wrapper>
      <h1>Hello World :)</h1>
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sair
      </button>
    </Wrapper>
  );
}
