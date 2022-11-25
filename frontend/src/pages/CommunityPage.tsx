import useModal from '../hooks/modal/useModal';
import styled, { keyframes } from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import CommuRankingCard from '../components/community/CommuRankingCard';
import CommuListCard from '../components/community/CommuListCard';
import MyModal from '../components/modal/MyModal';
import CommunityMaker from '../components/community/CommunityMaker';
import { SearchBox } from '../assets/styles/common/commonComponentStyle';

const CommunityPage = () => {
  const [isMakeOpen, handleMakeStateChange] = useModal();

  return (
    <>
      <MyModal
        isOpen={isMakeOpen}
        onModalStateChangeEvent={handleMakeStateChange}
      >
        <CommunityMaker></CommunityMaker>
      </MyModal>
      <CommuBox>
        <Header>
          다양한 댕댕이와 만나 보세요.
          <MakeBtn onClick={handleMakeStateChange}>커뮤니티 만들기</MakeBtn>
        </Header>
        <CommuContainer>
          <LeftBox>
            <SearchBox style={{ marginTop: '2rem' }}>
              <input></input>
              <button>검색</button>
            </SearchBox>
            <RankingHeader>인기 커뮤니티</RankingHeader>
            <RankingBox>
              <CommuRankingCard></CommuRankingCard>
              <CommuRankingCard></CommuRankingCard>
              <CommuRankingCard></CommuRankingCard>
            </RankingBox>
          </LeftBox>
          <RightBox>
            <CommuListHeader>커뮤니티 목록</CommuListHeader>
            <CommuListsBox>
              <CommuListCard></CommuListCard>
              <CommuListCard></CommuListCard>
              <CommuListCard></CommuListCard>
            </CommuListsBox>
          </RightBox>
        </CommuContainer>
        {/* <button onClick={handleContentsModalStateChange}>결과 카드</button> */}
      </CommuBox>
    </>
  );
};

export default CommunityPage;

const animation = keyframes`
  50% {
    transform: scale(1.05);
  }
`;

const CommuBox = styled.div`
  width: 100%;
  height: 80vh;
  font-family: ${font.normal};
`;

const Header = styled.div`
  font-size: 1.15rem;
  display: flexbox;
  justify-content: center;
  margin-top: 1.25rem;
  letter-spacing: 1px;
`;

const MakeBtn = styled.button`
  margin-left: 2rem;
  height: 2.7rem;
  width: 10.3rem;
  border: none;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: ${font.bold};
  font-size: 0.93rem;
  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;

const CommuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-evenly;
  margin-top: 1.3rem;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const SearchBox = styled.div`
//   width: 23rem;
//   height: 2rem;
//   line-height: 2rem;
//   border: solid 1px black;
//   margin-top: 1.9rem;
// `;

const RankingHeader = styled.div`
  width: 23rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  margin-top: 2.5rem;
`;

const RankingBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  margin-top: 0.7rem;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommuListHeader = styled.div`
  font-size: 1.15rem;
  display: flexbox;
  justify-content: center;
  margin-top: 1.9rem;
`;

const CommuListsBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
`;
