import styled from 'styled-components';

export const Container = styled.div`
  flex: 0 0 260px;
  max-width: 260px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #1b1b28;
  color: #fff;
  min-height: 100%;

  a {
    padding: 10px;

    &:hover {
      background: #ed6707;
    }
  }
`;

export const MenuHeader = styled.div`
  background: #1a1a27;
  height: 50px;
  border-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
`;
