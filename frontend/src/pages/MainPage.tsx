import { useNavigate } from 'react-router-dom';
import CommonWrapper from '../components/common/CommonWrapper';
import styled from 'styled-components';

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
            우리 집 댕댕이는 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 어디에서 왔을까?
            <div className="description">
              인공지능을 이용해 반려견의 종을 분석해보세요. <br /> 더 길게 쓰면
              좋을 것 같은데 어떻게 써야 사람들이 이용하지 않고는 못 배길까요.
              <br /> 밑에는 버튼이 들어갈 거예요. 호버하면 키 컬러가 나오는
              버튼이어요.
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
  height: 82.5vh;
  font-family: 'ONE-Mobile-Title';
  /* border: solid 1px red; */
  display: flex;
  flex-direction: row;
`;

const MainImageBox = styled.div`
  width: 40%;
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
  width: 60%;
  /* display: flex;
  justify-content: center; */
`;

const MainLetter = styled.div`
  font-size: 50px;
  margin-left: 130px;
  margin-top: 120px;
  line-height: 160%;
  .description {
    margin-top: 15px;
    font-size: 18px;
    font-family: 'ONE-Mobile-Regular';
    line-height: 29px;
  }
`;
