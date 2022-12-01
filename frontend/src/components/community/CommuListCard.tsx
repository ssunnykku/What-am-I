import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { theme } from '../../assets/styles/common/palette';
import LikeBtn from '../common/LikeBtn';

const CommuListCard = () => {
  const navigate = useNavigate();

  return (
    <ListCardBox>
      <ListImage></ListImage>
      <SmallBox>
        <CommuName>댕댕이를 사랑하는 서울 시민들의 모임</CommuName>
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
  width: 45rem;
  height: 8.5rem;
  min-height: 8.5rem;
  background-color: ${theme.backColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ListImage = styled.div`
  width: 7rem;
  height: 6.5rem;
  border: solid 1px gray;
  margin-left: 3rem;
  border-radius: 50%;
`;

const SmallBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
  width: 350px;
  height: 70%;
`;

const CommuName = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
`;

const LikeNum = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
`;
