import styled, { keyframes } from 'styled-components';
import { theme } from '../assets/styles/common/palette';
import { font } from '../assets/styles/common/fonts';
import { useNavigate } from 'react-router-dom';

const AITestResultPage = () => {
  const navigate = useNavigate();
  return (
    <ResultBox>
      <div style={{ letterSpacing: '1px', fontSize: '27px' }}>
        AI 견종 분석 결과
        <ResultDescBox>
          <PuppyImg></PuppyImg>
          <PuppyResult>
            "이름"의 견종 분석 결과
            <ResultText></ResultText>
            <div>로 확인되었습니다.</div>
            <ShareBtn onClick={() => navigate('/reviewboard')}>
              다른 강아지 구경가기
            </ShareBtn>
          </PuppyResult>
        </ResultDescBox>
      </div>
    </ResultBox>
  );
};

export default AITestResultPage;

const animation = keyframes`
  50% {
    transform: scale(1.05);
  }
`;

const ResultBox = styled.div`
  width: 56rem;
  height: 35rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  font-family: ${font.bold};
  color: ${theme.boldColor};
  background-color: #fffcf1;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ResultDescBox = styled.div`
  width: 45rem;
  height: 25rem;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const PuppyImg = styled.div`
  border: solid 1px ${theme.boldColor};
  height: 24rem;
`;

const PuppyResult = styled.div`
  height: 25rem;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ResultText = styled.div`
  height: 14rem;
  width: 20rem;
  border: solid 1px;
`;

const ShareBtn = styled.button`
  height: 4rem;
  width: 20rem;
  margin-top: 15px;
  font-family: ${font.bold};
  border-radius: 10px;
  border: solid 1px ${theme.boldColor};
  color: ${theme.boldColor};
  background-color: white;
  cursor: pointer;
  font-size: 22px;

  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;
