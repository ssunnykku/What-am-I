import React from 'react';
import styled, { keyframes } from 'styled-components';

const ResultCard = () => {
  return (
    <>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
      <ResultCardBox></ResultCardBox>
    </>
  );
};

export default ResultCard;

const popup = keyframes`
  from {
    transform: translateY(0.25rem);
  }
  to {
    transform: translateY(0rem);
  }
`;

const ResultCardBox = styled.div`
  width: 14rem;
  height: 13rem;
  border: solid 1px black;
  border-radius: 10px;
  margin: 1rem 1rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
    cursor: pointer;
  }
`;
