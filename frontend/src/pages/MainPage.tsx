import { useNavigate } from 'react-router-dom';
import CommonWrapper from '../components/common/CommonWrapper';
import styled, { keyframes } from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';

function MainPage() {
  const navigate = useNavigate();
  return (
    <CommonWrapper>
      <MainContent>
        <MainImageBox>
          <MainImage />
        </MainImageBox>
        <MainLetterBox>
          <p>우리 집 댕댕이는</p>
          <p>어디에서 왔을까?</p>
          <div className="description">
            저 강아지의 엄마 아빠는 누굴까? 궁금할 때가 있습니다. AI로 종을
            분석해 보세요. <br />
            다른 강아지의 종 분석 결과도 구경할 수 있답니다. 사람들과 대화할 수
            있는 공간도 있으니 마음껏 즐겨 보세요!
          </div>
          <LetterBtn onClick={() => navigate('/dna')}>
            견종 분석하러 가기
          </LetterBtn>
        </MainLetterBox>
      </MainContent>
    </CommonWrapper>
  );
}

export default MainPage;

const animation = keyframes`
  0% {
    transform: translateY(0.5rem);
  }
  100% {
    transform: translateY(0rem);
  }
`;

const MainContent = styled.div`
  width: 100%;
  height: 90vh;
  font-family: ${font.bold};
  display: flex;
  flex-direction: row;
`;

const MainImageBox = styled.div`
  width: 50%;
  max-width: 60rem;
  position: relative;
  overflow: hidden;
`;

const MainImage = styled.div`
  position: absolute;
  background-image: url('/img/강아지.png');
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MainLetterBox = styled.div`
  width: 50%;
  min-width: 30rem;
  margin-left: 10rem;
  margin-top: 12rem;
  font-size: 3.5rem;
  line-height: 130%;

  .description {
    margin-top: 1.3rem;
    font-size: 1.1rem;
    font-family: ${font.normal};
    line-height: 1.8rem;
    width: 41rem;
  }
`;

const LetterBtn = styled.button`
  width: 15rem;
  height: 4rem;
  margin-top: 2rem;
  border-radius: 20px;
  font-size: 1.4rem;
  font-family: ${font.bold};
  cursor: pointer;
  border: 0;
  background-color: ${theme.mainColor};
  color: white;

  :hover {
    animation: ${animation} 0.8s;
    background-color: ${theme.pointColor};
  }
`;
