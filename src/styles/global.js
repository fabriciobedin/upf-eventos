import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #312E38;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    font-weight: 500;
  }

  .primary{
    background: #ed6707;

    &:hover {
      background: #e04113;
    }
  }

  .secondary{
    background: #6c757d;

    &:hover {
      background: #5a6268;
    }
  }

  .success{
    background: #28a745;
  
    &:hover {
      background: #218838;
    }
  }
`;
