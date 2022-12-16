import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import CommuLikeBtn from './CommuLikeBtn';
import { CommunityTypeProps } from './CommuRankingCard';

const CommuListCard = ({ listInfo }: CommunityTypeProps) => {
  return (
    <ListCardBox>
      <ListImage>
        <img src={listInfo?.communityImage} />
      </ListImage>
      <SmallBox>
        <CommuName>{listInfo?.name}</CommuName>
        <LikeNum>
          <CommuLikeBtn listInfo={listInfo} />
        </LikeNum>
      </SmallBox>
      <Link to={`/likedcommunity?id=${listInfo?.id}`}>
        <EntryBtn>입장하기</EntryBtn>
      </Link>
    </ListCardBox>
  );
};

export default CommuListCard;

const ListCardBox = styled.div`
  width: 42rem;
  height: 9rem;
  min-height: 9rem;
  background-color: ${theme.backColor};
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const ListImage = styled.div`
  width: 7rem;
  height: 7rem;
  border: solid 1px gray;
  margin-left: 40px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SmallBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  width: 300px;
  height: 70%;
`;

const CommuName = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 17px;
  font-family: ${font.bold};
`;

const LikeNum = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
