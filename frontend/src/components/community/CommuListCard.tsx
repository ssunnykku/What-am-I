import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LikeNum,
  EntryBtn,
} from '../../assets/styles/common/commonComponentStyle';
import { theme } from '../../assets/styles/common/palette';

const CommuListCard = () => {
  const navigate = useNavigate();

  return (
    <ListCardBox>
      <ListImage></ListImage>
      <SmallBox>
        <CommuName>댕댕이를 사랑하는 서울 시민들의 모임</CommuName>
        <LikeNum style={{ display: 'flex', alignItems: 'center' }}>
          💙30
        </LikeNum>
      </SmallBox>
      <EntryBtn onClick={() => navigate('/likedcommunity')}>입장하기</EntryBtn>
      <CheckBtn>💙</CheckBtn>
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
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const ListImage = styled.div`
  width: 7rem;
  height: 6.5rem;
  border: solid 1px gray;
  margin-left: 2.5rem;
  border-radius: 50%;
`;

const SmallBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

const CommuName = styled.div`
  width: 20rem;
  height: 2rem;
  display: flex;
  align-items: center;
`;

const CheckBtn = styled.div`
  width: 2rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
