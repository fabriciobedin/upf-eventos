import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 20%;
  background: #333;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #eee;

  Button {
    width: 300px;
  }
`;
