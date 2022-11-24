import React from 'react';
import styled, { keyframes } from 'styled-components';

// 말 그대로 커뮤 하나
// 이걸 클릭하면 -> 셀렉티드 커뮤로

const CommuListCard = () => {
  return (
    <>
      <CommuListCardBox>
        <CommuListImage></CommuListImage>
        <CommuSmallBox>
          <CommuName>댕댕이를 사랑하는 서울 시민들의 모임</CommuName>
          <CommuNum>💙30</CommuNum>
        </CommuSmallBox>
        <CommuEntryBtn>입장하기</CommuEntryBtn>
        <CommuCheckBtn>💙</CommuCheckBtn>
      </CommuListCardBox>
    </>
  );
};

export default CommuListCard;

const popup = keyframes`
  from {
    transform: translateY(0.2rem);
  }
  to {
    transform: translateY(0rem);
  }
`;

const CommuListCardBox = styled.div`
  width: 42rem;
  height: 8rem;
  border: solid 1px black;
  border-radius: 20px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  :hover {
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
  }
`;

const CommuListImage = styled.div`
  width: 6.7rem;
  height: 6.3rem;
  border: solid 1px gray;
  margin-left: 2rem;
  border-radius: 50%;
`;

const CommuSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
`;

const CommuName = styled.div`
  width: 19rem;
  height: 2rem;
  display: flex;
  align-items: center;
`;

const CommuNum = styled.div`
  width: 15rem;
  height: 2rem;
  display: flex;
  align-items: center;
`;

const CommuEntryBtn = styled.button`
  width: 8rem;
  height: 2.7rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const CommuCheckBtn = styled.div`
  width: 2rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;
