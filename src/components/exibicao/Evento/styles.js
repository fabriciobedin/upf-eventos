import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const List = styled.ul`
  display: flex;
  list-style: none;
  padding-top: 10px;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 5px;
    margin: 10px;
    width: 250px;
    border: 2px solid #ed6707;
  }
`;

export const TitleContainer = styled.div`
  padding: 5px;
  border-bottom: 1px solid #ed6707;

  strong {
    text-transform: uppercase;
  }
`;
