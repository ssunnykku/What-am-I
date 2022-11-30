import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { LikeNum } from '../../assets/styles/common/commonComponentStyle';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';

const CommuRankingCard = () => {
  const navigate = useNavigate();

  return (
    <CommuRankingCardBox onClick={() => navigate('/likedcommunity')}>
      <CommuImage></CommuImage>
      <CommuName>댕댕이를 사랑하는 일산인들의 모임</CommuName>
      {/* <CommuDesc>
        <CommuName>댕댕이를 사랑하는 일산인들의 모임</CommuName>
        <LikeNum>💙10</LikeNum>
      </CommuDesc> */}
    </CommuRankingCardBox>
  );
};

export default CommuRankingCard;

const popup = keyframes`
  from {
    transform: translateY(0.5rem);
  }
  to {
    transform: translateY(0rem);
  }
`;

const CommuRankingCardBox = styled.div`
  width: 11rem;
  height: 12rem;
  border-radius: 20px;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.backColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.4);
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
    cursor: pointer;
  }
`;

const CommuImage = styled.div`
  height: 7rem;
  width: 9rem;
  border: solid 1px gray;
  margin-top: 10px;
  border-radius: 10px;
`;

// const CommuDesc = styled.div`
//   height: 40%;
//   padding: 0 0.8rem;
// `;

const CommuName = styled.div`
  width: 10rem;
  height: 3.5rem;
  margin-top: 10px;
  text-align: center;
  font-family: ${font.normal};
  font-size: 14px;
`;
