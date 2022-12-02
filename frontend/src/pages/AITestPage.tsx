import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';

const AITestPage = () => {
  return (
    <AiTestBox>
      <Header>소중한 나의 댕댕이가 어디서 왔는지 알아보세요.</Header>
      <InnerBox>
        <ImageBigBox>
          <ImageBox></ImageBox>
          <InputBox></InputBox>
        </ImageBigBox>
      </InnerBox>
    </AiTestBox>
  );
};

export default AITestPage;

const AiTestBox = styled.div`
  width: 40rem;
  height: 25rem;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  letter-spacing: 2px;
  font-size: 17px;
`;

const InnerBox = styled.div`
  border: solid 1px red;
  width: 28rem;
  height: 16rem;
  margin-top: 1rem;
`;

const ImageBigBox = styled.div`
  border: solid 1px blue;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 13rem;
`;

const ImageBox = styled.div`
  border: solid 1px purple;
`;

const InputBox = styled.div`
  border: solid 1px pink;
`;
