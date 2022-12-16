import styled, { keyframes } from 'styled-components';
import { theme } from '../assets/styles/common/palette';
import { font } from '../assets/styles/common/fonts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPuppiesData, postPuppyData } from '../apis/mypageFetcher';
import Storage from '../storage/storage';

const AITestResultPage = () => {
  const [result, setResult] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const resultData = location.state.result;
  const aiImage = location.state.aiImage;
  const dogName = location.state.dogName;

  useEffect(() => {
    async function getData() {
      setResult(resultData);
    }
    getData();
  }, []);
  return (
    <ResultBox>
      <div style={{ letterSpacing: '1px', fontSize: '27px' }}>
        AI 견종 분석 결과
        <ResultDescBox>
          <PuppyImg>
            <img src={URL.createObjectURL(aiImage)} />
          </PuppyImg>
          <PuppyResult>
            {`${dogName}의 견종 분석 결과`}
            <ResultText>
              {result &&
                result.map((value) => (
                  <Breed key={value.id}>
                    <BreedText>{value.label}</BreedText>
                    <BreedText>{(value.score * 100).toFixed(1)}%</BreedText>
                  </Breed>
                ))}
            </ResultText>
            <div>로 확인되었습니다.</div>
            {!Storage.getUserIdItem() ? (
              <ShareBtn onClick={() => navigate('/login')}>
                로그인 하고 댕댕이 보러 가기
              </ShareBtn>
            ) : (
              <ShareBtn onClick={() => navigate('/reviewboard')}>
                더 많은 댕댕이 보러 가기
              </ShareBtn>
            )}
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
  background-color: ${theme.lightColor};
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
  width: 90%;
  height: 24rem;
  display: flex;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  height: 9rem;
  width: 20rem;
  border: solid 1px;
  padding: 5px;
`;

const Breed = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const BreedText = styled.div`
  font-size: 16px;
`;

const ShareBtn = styled.button`
  height: 4rem;
  width: 20rem;
  margin-top: 60px;
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
