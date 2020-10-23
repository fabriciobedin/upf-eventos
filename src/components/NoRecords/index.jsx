import React from 'react';
import { Container } from './styles';

function NoRecords({ message }) {
  return (
    <Container>
      <span>{message ?? 'Nenhum registro encontrado.'}</span>
    </Container>
  );
}

export default NoRecords;
