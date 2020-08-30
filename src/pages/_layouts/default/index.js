import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../../../components/Sidebar';
import { Container, ContainerContent } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Container>
        <Sidebar />
        <ContainerContent>
          {children}
        </ContainerContent>
      </Container>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};
