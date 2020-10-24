import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background: #eee;
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  border: 2px solid #eee;
  color: #777;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #f00;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #ed6707;
      color: #ed6707;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ed6707;
    `}

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #777;
    height: 100px;  
    font-family: 'Roboto Slab',serif;
    font-size: 16px;


    &::placeholder {
      color: #777;
    }  
  }

  svg {
    margin-right: 12px;
  }
`;

export const Error = styled(Tooltip)`
  height: 16px;
  margin-left: 12px;

  svg {
    margin: 0;
  }

  span {
    background: #e00;
    color: #fff;

    &::before {
      border-color: #e00 transparent;
    }
  }
`;
