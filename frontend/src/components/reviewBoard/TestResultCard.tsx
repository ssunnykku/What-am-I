import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import {
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';
import { getPuppyData } from '../../apis/mypageFetcher';
import { theme } from '../../assets/styles/common/palette';
import { AIresultType, ReviewType } from '../../types/reviewboard/reviewType';
import { deleteReviewRequest } from '../../apis/reviewFetcher';

export interface receiveProps {
  id: number;
  setReviews?: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  onCardModalClickEvent?: () => void;
}

function TestResultCard(props: receiveProps) {
  const [puppy, setPuppy] = useState<AIresultType>();

  useEffect(() => {
    async function getReview() {
      const response = await getPuppyData(props.id);
      setPuppy(response);
    }
    getReview();
  }, []);

  const deleteMyResultCard = async () => {
    await deleteReviewRequest(`airesult/${props.id}`);
    location.reload();
  };
  return (
    <CardContainer onClick={props.onCardModalClickEvent}>
      <Img src={puppy?.aiImage} alt="dog_img"></Img>
      <Name>{puppy?.dogName}</Name>
      <div className="wrapper">
        <ButtonContainer id="ButtonContainer">
          <DeleteButton color="#ff0000" onClick={deleteMyResultCard}>
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
  gap: 10px;
  align-items: center;
  width: 180px;
  height: 230px;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 2px 5px gray;
  padding: 20px;
  background-color: ${theme.lightColor};
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
  object-fit: cover; // 이미지 확대하여 비율유지
  width: 150px;
  height: 150px;
  min-height: 150px;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px gray;
`;

const Name = styled.div`
  font-family: ${font.bold};
  font-size: large;
`;

const ButtonContainer = styled.div`
  visibility: hidden;
  position: absolute;
  top: 175px;
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
  z-index: 10000;
`;

export default TestResultCard;
