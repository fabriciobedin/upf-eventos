import styled from 'styled-components';

import background from '../../assets/background.jpg';
import user_img from '../../assets/user_profile.png';

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
  background-image: url(${user_img});
  background-size: cover;
  background-position: center;
  border: 5px solid white;
  margin-top: -50px;
`;


export const Content = styled.div`
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background-color: white;
  max-height: 75%;
  max-width: 90%;
  margin: auto;
  border-radius: 10px;
  text-align: center;
`;