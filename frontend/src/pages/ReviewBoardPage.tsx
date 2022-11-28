import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import { SearchBox } from '../assets/styles/common/commonComponentStyle';
import { WritingModal } from '../components/modal/WritingModal';
import { ContentsModal } from '../components/modal/ContentsModal';
import { theme } from '../assets/styles/common/palette';

const ReviewBoardPage = () => {
  return (
    <>
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
          <SearchBox style={{ position: 'absolute', bottom: '5%' }}>
            <input></input>
            <button>검색</button>
          </SearchBox>
        </BoardContent>
      </BoardBox>
    </>
  );
};

export default ReviewBoardPage;

const BoardBox = styled.div`
  width: 100%;
  height: 80vh;
  font-family: ${font.bold};
`;

const BoardHeader = styled.div`
  font-size: 19px;
  display: flexbox;
  justify-content: center;
  margin-top: 5rem;
  letter-spacing: 1px;
`;

const BoardContent = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
`;

const CardBox = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 70rem;
  min-width: 70rem;
  min-height: 27rem;
  margin-top: 2.5rem;
`;

const SlideLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid ${theme.backColor};

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
  border-left: 1.5rem solid ${theme.backColor};
  border-right: 1.5rem solid transparent;

  :hover {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid ${theme.pointColor};
    border-right: 1.5rem solid transparent;
    cursor: pointer;
  }
`;
