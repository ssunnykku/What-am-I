import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import { SearchBox } from '../assets/styles/common/commonComponentStyle';
import WritingModal from '../components/modal/WritingModal';
import ContentsModal from '../components/modal/ContentsModal';
import { theme } from '../assets/styles/common/palette';
import { useEffect } from 'react';

const ReviewBoardPage = () => {
  useEffect(() => {}, []);

  return (
    <BoardBox>
      <BoardHeader>
        사람들과 AI 분석 결과를 공유해보세요.
        <WritingModal />
      </BoardHeader>
      <BoardContent>
        <SlideLeftBtn />
        <CardBox>
          <ContentsModal />
        </CardBox>
        <SlideRightBtn />
      </BoardContent>
      <SearchBox style={{ marginTop: '7vh' }}>
        <input></input>
        <button>검색</button>
      </SearchBox>
    </BoardBox>
  );
};

export default ReviewBoardPage;

const BoardBox = styled.div`
  width: 100%;
  height: 85vh;
  font-family: ${font.bold};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardHeader = styled.div`
  font-size: 20px;
  display: flexbox;
  justify-content: center;
  margin-top: 8vh;
  letter-spacing: 1px;
`;

const BoardContent = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
  height: 30rem;
  margin-top: 5vh;
`;

const CardBox = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 70rem;
  min-width: 70rem;
  min-height: 27rem;
`;

const SlideLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid lightgray;

  :hover {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid transparent;
    border-right: 1.5rem solid ${theme.pointColor};
    cursor: pointer;
  }
`;

const SlideRightBtn = styled.div`
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid lightgray;
  border-right: 1.5rem solid transparent;

  :hover {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid ${theme.pointColor};
    border-right: 1.5rem solid transparent;
    cursor: pointer;
  }
`;
