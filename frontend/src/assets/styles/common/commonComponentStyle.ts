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

const animation = keyframes`
  50% {
    transform: scale(1.1);
  }
`;

export const CommonMyButton = styled.button`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
`;

export const CommonMyInput = styled.input`
  width: 94%;
  padding: 6px 12px;
  border-radius: 10px;
  outline: none;
`;

export const AuthFormWrapper = styled.form`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export const AuthFormInputContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const AuthFormButtonContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const SearchBox = styled.div`
  width: 23rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  input {
    width: 18.5rem;
  }
  button {
    width: 4.5rem;
    font-family: ${font.normal};
  }
`;

export const LikeNum = styled.div`
  width: 5rem;
  height: 2rem;
`;

export const CreateBtn = styled.button`
  width: 8rem;
  height: 2.4rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${theme.pointColor};
  font-family: ${font.bold};
  color: white;
  font-size: 15px;
  margin-left: 20px;

  :hover {
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
  }
`;

export const EntryBtn = styled.button`
  width: 8rem;
  height: 2.5rem;
  border-radius: 20px;
  cursor: pointer;
  border: solid 2px ${theme.mainColor};
  color: ${theme.mainColor};
  background-color: white;
  font-family: ${font.bold};
  font-size: 15px;
  margin-left: 20px;

  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;

export const EditDelBtn = styled.button`
  width: 3rem;
  height: 1.6rem;
  margin-top: 0.5rem;
  border-radius: 20px;
  background-color: white;
  border: solid 1px ${theme.mainColor};
  cursor: pointer;
  color: ${theme.mainColor};
  margin-right: 8px;
`;
