import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
  padding: 16px;
  width: 100%;

  h1 {
    display: flex;
    margin: 40px auto;
  }

  button {
    background: #c00;
    border-radius: 4px;
    border: 0;
    color: #fff;
    font-weight: 700;
    padding: 8px;
    margin-top: 8px;
    transition: background-color 175ms;
    &:hover {
      background: ${darken(0.05, '#f00')};
    }
  }
`;
