import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;

  p {
    color: #7e8299 !important;
    font-weight: 500 !important;
  }
`;

export const Title = styled.span`
  font-size: 1.25rem;
  padding: 10px 0px;
`;

export const ContainerDatas = styled.div`
  display: flex;
  max-width: 25%;
  justify-content: space-between;
  padding: 15px 0px;
`;

export const Datas = styled.div`
  div {
    padding-bottom: 5px;
    font-weight: 500;
  }

  span {
    background: #e1f0ff;
    color: #3699ff;
    padding: 5px;
    border-radius: 4px;
  }
`;




export const ParticipantesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction:row;
  justify-content: space-between;
`;

export const ListaContainer = styled.div`
  max-width:50%;
  height: 10px;
  li {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;
