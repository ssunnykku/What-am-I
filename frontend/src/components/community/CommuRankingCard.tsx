import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import LikeBtn from '../common/LikeBtn';
import { CommunityType } from '../../types/community/communityType';

export interface CommunityTypeProps {
  ranking: CommunityType;
}

const CommuRankingCard = ({ ranking }: CommunityTypeProps) => {
  const navigate = useNavigate();

  return (
    <CommuRankingCardBox onClick={() => navigate('/likedcommunity')}>
      <CommuImage>
        <img src={ranking.communityImage} />
      </CommuImage>
      <CommuName>{ranking.name}</CommuName>
      <div className="like-icon">
        <LikeBtn />
      </div>
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
  width: 12rem;
  height: 12rem;
  border-radius: 20px;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.backColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

  position: relative;
  overflow: hidden;
  .like-icon {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 150%;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.4);
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
    cursor: pointer;

    .like-icon {
      top: 45%;
    }
  }
`;

const CommuImage = styled.div`
  height: 150px;
  width: 170px;
  border: solid 1px gray;
  margin-top: 15px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommuName = styled.div`
  width: 10rem;
  height: 3.5rem;
  margin-top: 10px;
  text-align: center;
  font-family: ${font.bold};
  font-size: 15px;
`;
