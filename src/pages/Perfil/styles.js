import styled from 'styled-components';

import background from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;


export const HeaderBox = styled.div`
  text-align: center;
	color: white;
	font-family: sans-serif;
	font-size: 36px;
	padding: 20px;
	display: flex;
	flex-direction: column;
  justify-content: center;

  background: url(${background}) no-repeat center;
  background-size: cover;
  height: 30%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;


export const FooterBox = styled.div`
  text-align: center;
	color: white;
	font-family: sans-serif;
	font-size: 36px;
	padding: 20px;
	display: flex;
	flex-direction: column;
  justify-content: center;

  background-color: #1b1b28;
  height: 70%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const UserImg = styled.div`
  width: 150px;
  margin: 0 auto;
  height: 150px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: cover;
  background-position: center;
  border: 5px solid white;
  margin-top: -50px;
`;


export const Content = styled.div`
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background-color: white;
  max-height: 80%;
  max-width: 90%;
  margin: auto;
  text-align: center;
`;

export const BodyContent = styled.div`
  position: absolute;
  height: calc(100% - 100px);
  width: 100%;
  overflow-y: auto;
`;

export const ContainerForm = styled.div `
  width: 50%;
  margin: 0 auto;
  margin-top: 30px;
`;

export const Divider = styled.div `
  border-top: 1px solid #D6D6D6;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;