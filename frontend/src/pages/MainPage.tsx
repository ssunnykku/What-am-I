import { useNavigate } from 'react-router-dom';
import CommonWrapper from '../components/common/CommonWrapper';
import styled, { keyframes } from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';
import axios from 'axios';
import { useEffect } from 'react';

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await axios.get('http://localhost:5001/reviews');
      console.log(response);
    }
    getData();
  }, []);

  return (
    <CommonWrapper>
      <MainContent>
        <MainImageBox>
          <MainImage></MainImage>
        </MainImageBox>
        <MainLetterBox>
          <p>우리 집 댕댕이는</p>
          <p className="second">어디에서 왔을까?</p>
          <div className="description">
            인공지능을 이용해 반려견의 종을 분석해보세요. <br /> 더 길게 쓰면
            좋을 것 같은데 어떻게 써야 사람들이 이용하지 않고는 못 배길까요.
          </div>
          <LetterBtn onClick={() => navigate('/dna')}>
            AI 분석하러 가기
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
  margin-top: 12.5rem;
  font-size: 3.5rem;
  line-height: 130%;
  .description {
    margin-top: 1.3rem;
    font-size: 1.1rem;
    font-family: ${font.normal};
    line-height: 1.8rem;
  }
`;

const LetterBtn = styled.button`
  width: 14rem;
  height: 4rem;
  margin-top: 2.5rem;
  border-radius: 25px;
  font-size: 1.3rem;
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
