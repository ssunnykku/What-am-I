import { useState } from 'react';
import styled from 'styled-components';

function ResultCard({ img }: any) {
  // 삭제버튼 클릭 시 확인창 함수
  // TODO 확인창 함수를 공통컴포넌트로 뺄까?
  const useConfirm = (message: any, onConfirm: any, onCancel: any) => {
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const deleteConfirm = () => console.log('삭제했습니다.');
  const cancelConfirm = () => console.log('취소했습니다.');

  const confirmDelete = useConfirm(
    '삭제하시겠습니까?',
    deleteConfirm,
    cancelConfirm,
  );
  return (
    <CardContainer>
      <Img src={img} alt="dog_img"></Img>
      <div>강아지이름</div>
      <div>종류 100%</div>
      {/* TODO 마우스 호버 시 버튼 컴포넌트가 카드 앞에 등장하게끔 어떻게할까*/}
      <div className="wrapper">
        <ButtonContainer id="ButtonContainer">
          <Button color="#000000">상세</Button>
          <Button color="#ff0000" onClick={confirmDelete}>
            삭제
          </Button>
        </ButtonContainer>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 200px;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 2px 5px gray;
  padding: 20px;
  transition: all 0.1s linear;

  :hover {
    transform: scale(1.05);
    .wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 20px;
      box-shadow: 1px 2px 5px gray;
      transition: all 0.02s linear;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  :hover #ButtonContainer {
    // 마우스 호버 시 버튼 표시
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  min-height: 120px;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px gray;
`;

const ButtonContainer = styled.div`
  visibility: hidden;
  position: relative;
  top: 150px;
  left: 45px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Button = styled.button`
  z-index: 1;
  width: 100px;
  padding: 5px 30px;
  border: 1.5px solid ${(props) => props.color || 'black'};
  border-radius: 5px;
  background-color: #ffffff;
  color: ${(props) => props.color || 'black'};
  font-weight: 600;
  :hover {
    background-color: #dedede;
  }
`;

export default ResultCard;
