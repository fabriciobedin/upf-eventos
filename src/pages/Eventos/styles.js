import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 900px;
  margin-top: 30px;

  form {
    label {
      flex: 0 0 25%;
    }

    input,
    select {
      flex: 0 0 75%;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    h2 {
      margin: 10px 0 20px;
    }

    hr {
      margin: 20px 0;
      border: none;
      border-bottom: 1px solid #cdcdcd;
      width: 100%;
    }
  }
`;

export const RowFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  margin: 10px;

  > div {
    display: flex;
    margin: 15px;
    button {
      margin-left: auto;
      background: greenyellow;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
