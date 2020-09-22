import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  max-width: 600px;

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

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin: 5px;
  }
`;

export const SubtitleContainer = styled.div`
  display:flex;
  flex:1;
  padding-top: 30px;
  button {
    margin-left: auto;
    background: #ed6707;
    color: #FFF;
    border-radius: 4px;
    padding: 0 8px;
    font-weight: 500;
  }
`;
