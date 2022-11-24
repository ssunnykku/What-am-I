import { useNavigate } from 'react-router-dom';
import CommonWrapper from '../components/common/CommonWrapper';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';

function MainPage() {
  // 버튼 넣고 온클릭 => navigate("/~")로 이동
  const navigate = useNavigate();

  return (
    <CommonWrapper>
      <MainContent>
        <MainImageBox>
          <MainImage></MainImage>
        </MainImageBox>
        <MainLetterBox>
          <MainLetter>
            <p>우리 집 댕댕이는</p>
            <p className="second">어디에서 왔을까?</p>
            <div className="description">
              인공지능을 이용해 반려견의 종을 분석해보세요. <br /> 더 길게 쓰면
              좋을 것 같은데 어떻게 써야 사람들이 이용하지 않고는 못 배길까요.
            </div>
          </MainLetter>
        </MainLetterBox>
      </MainContent>
    </CommonWrapper>
  );
}

export default MainPage;

const MainContent = styled.div`
  width: 100%;
  height: 82vh;
  font-family: ${font.bold};
  /* border: solid 1px red; */
  display: flex;
  flex-direction: row;
`;

const MainImageBox = styled.div`
  width: 42%;
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
  width: 58%;
  padding-left: 6rem;
  padding-top: 8rem;
`;

const MainLetter = styled.div`
  font-size: 3.4rem;
  line-height: 160%;
  .description {
    margin-top: 1.2rem;
    font-size: 1.12rem;
    font-family: ${font.normal};
    line-height: 1.8rem;
  }
  .second {
    margin-left: 15rem;
  }
`;
