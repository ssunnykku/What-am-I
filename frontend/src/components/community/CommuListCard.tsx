import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { theme } from '../../assets/styles/common/palette';
import LikeBtn from '../common/LikeBtn';
import { CommunityType } from '../../types/community/communityType';
import { font } from '../../assets/styles/common/fonts';

export interface CommunityListsTypeProps {
  commu: CommunityType;
}

const CommuListCard = ({ commu }: CommunityListsTypeProps) => {
  const navigate = useNavigate();

  return (
    <ListCardBox>
      <ListImage>
        <img src={commu.communityImage} />
      </ListImage>
      <SmallBox>
        <CommuName>{commu.name}</CommuName>
        <LikeNum>
          <LikeBtn />
        </LikeNum>
      </SmallBox>
      <EntryBtn onClick={() => navigate('/likedcommunity')}>입장하기</EntryBtn>
    </ListCardBox>
  );
};

export default CommuListCard;

const ListCardBox = styled.div`
  width: 42rem;
  height: 9rem;
  min-height: 9rem;
  background-color: ${theme.backColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ListImage = styled.div`
  width: 7.5rem;
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
  font-size: 16px;
  font-family: ${font.normal};
`;

const LikeNum = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
