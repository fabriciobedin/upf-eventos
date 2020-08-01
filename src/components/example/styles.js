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

  form {
    display: flex;
    input,
    button {
      font-size: 16px;
    }
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    padding: 8px;
    color: #000;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
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
