import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 400px;
  }

  form {
    margin: 32px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #888;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${shade(0.2, '#999')};
      }
    }
  }
  > a {
    color: #ed6707;
    display: block;
    margin-top: 16px;
    text-decoration: none;
    transition: color 0.3s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: #e04113;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
