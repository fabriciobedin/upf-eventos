import styled from 'styled-components';

export const Container = styled.div`
  flex: 0 0 260px;
  max-width: 260px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #1b1b28;
  color: #fff;
  min-height: 100%;
  padding-top: 20px;
`;

export const MenuHeader = styled.div`
  height: 130px;
  max-width: 100%;
  text-align: center;
  
    & a {
      color: white;
      text-decoration: none;
    }
`;

export const ProfileImg = styled.div`
  width: 130px;
  height: 100%;
  display: inline-block;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: cover;
  background-position: center;
  border: 2px solid white;
`;

export const MenuList = styled.div`
  margin-top: 40px;
  a {
    padding: 10px;

    &:hover {
      background: #ed6707;
    }
  }
`;