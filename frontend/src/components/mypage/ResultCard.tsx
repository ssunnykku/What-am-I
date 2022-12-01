import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import {
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';

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
          <DetailButton color="#000000">상세</DetailButton>
          <DeleteButton color="#ff0000" onClick={confirmDelete}>
            삭제
          </DeleteButton>
        </ButtonContainer>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 250px;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 2px 5px gray;
  padding: 20px;
  background-color: #fffcf1;
  transition: all 0.1s linear;
  font-family: ${font.normal};

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
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  :hover #ButtonContainer {
    // 마우스 호버 시 버튼 표시
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  min-height: 150px;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px gray;
`;

const ButtonContainer = styled.div`
  visibility: hidden;
  position: absolute;
  top: 180px;
  left: 60px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DetailButton = styled(EntryBtn)`
  margin-left: 0px;
  width: 100px;
`;

const DeleteButton = styled(CreateBtn)`
  margin-left: 0px;
  width: 100px;
`;

export default ResultCard;
