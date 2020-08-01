import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    outline:0 ;
    padding: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    background-color: #eee;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
    outline: 0;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
