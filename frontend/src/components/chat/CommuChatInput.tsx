import { useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { BottomBox, InputBox } from '../../pages/ChatRoomPage';
import { socketProps } from './CommuChatLog';

const CommuChatInput = ({ nickname, socket }: socketProps) => {
  const [chatMessage, setChatMessage] = useState('');

  // 여기에 프롭스로 소켓 넘겨주기
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket?.emit('onSend', {
      nickname: nickname,
      msg: chatMessage,
    });
    setChatMessage('');
  };

  const onChangeChatMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  return (
    <BottomBox>
      <InputBox style={{ bottom: '20px' }}>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="메시지를 입력해주세요..."
            value={chatMessage}
            onChange={onChangeChatMsg}
          />
          <div>
            <ImageOutlinedIcon
              style={{
                fontSize: '30px',
                width: '40px',
              }}
            />
          </div>
          <button
            style={{ width: '10%', marginLeft: '5px' }}
            // disabled={inputChatMsg.length === 0}
            // onClick={postChatMsg}
            // onClick={handleRequestSocket}
          >
            <SendOutlinedIcon
              style={{
                fontSize: '30px',
              }}
            />
          </button>
        </form>
      </InputBox>
    </BottomBox>
  );
};

export default CommuChatInput;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 55vw;
  height: 95%;
  max-width: 950px;
  min-width: 450px;
  background-color: ${theme.backColor};
  margin: 10px 0;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-family: ${font.bold};

  header {
    padding: 20px 30px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    border-bottom: solid 0.1px lightgray;

    .chat-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .chat-name {
      font-size: 17px;
      margin-left: 15px;
    }
  }
`;
