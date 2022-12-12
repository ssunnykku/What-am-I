import styled, { keyframes } from 'styled-components';
import { font } from '../common/fonts';
import { theme } from '../../../assets/styles/common/palette';

const popup = keyframes`
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const jump = keyframes`
  50% {
    transform: scale(1.1);
  }
`;

export const CommonMyButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: ${theme.pointColor};
  transition: 0.4s;
  &:hover {
    color: ${theme.pointColor};
    background-color: white;
    border: 2px solid ${theme.pointColor};
  }
`;

export const CommonMyInput = styled.input`
  width: 90%;
  padding: 8px 16px;
  border-radius: 10px;
  outline: none;
`;

export const AuthFormWrapper = styled.form`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 1rem;
`;

export const AuthFormInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const AuthFormButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 1rem;
`;

export const SearchBox = styled.form`
  width: 23rem;
  height: 2rem;
  display: flex;

  input {
    width: 18.5rem;
  }
  button {
    width: 4.5rem;
    font-family: ${font.normal};
  }
`;

export const CreateBtn = styled.button`
  width: 125px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${theme.pointColor};
  font-family: ${font.bold};
  color: white;
  font-size: 17px;
  margin-left: 25px;

  :hover {
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
  }
`;

export const EntryBtn = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  border: solid 2px ${theme.mainColor};
  color: ${theme.mainColor};
  background-color: white;
  font-family: ${font.bold};
  font-size: 16px;
  margin-left: 20px;

  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${jump};
  }
`;

export const EditDelBtn = styled.button`
  width: 3rem;
  height: 1.6rem;
  border-radius: 20px;
  background-color: white;
  border: solid 1px ${theme.mainColor};
  cursor: pointer;
  color: ${theme.mainColor};
  margin-right: 5px;
`;
