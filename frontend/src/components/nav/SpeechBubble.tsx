import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../assets/styles/common/palette';

const SpeechBubble = () => {
  const navigate = useNavigate();

  return (
    <BubbleBox onClick={() => navigate('/chatroom')}>
      <div>✉️</div>
      <Alarm>2</Alarm>
    </BubbleBox>
  );
};

export default SpeechBubble;

const infiniteJump = keyframes`
  0% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const BubbleBox = styled.div`
  position: relative;
  width: 45px;
  height: 43px;
  border-radius: 40%;
  margin-top: 30px;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.mainColor};
  animation: ${infiniteJump} 1s linear infinite;

  :after {
    border-top: 10px solid ${theme.mainColor};
    border-left: 0px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 15px;
    left: 45px;
  }
`;

const Alarm = styled.div`
  background-color: red;
  width: 15px;
  height: 15px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  right: 4px;
  top: 5px;
  border-radius: 50%;
`;
