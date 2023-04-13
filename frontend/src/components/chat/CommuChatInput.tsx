import { useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { BottomBox, InputBox } from '../../pages/ChatRoomPage';
import { socketProps } from './CommuChatLog';

const CommuChatInput = ({ nickname, profile, socket }: socketProps) => {
  const [chatMessage, setChatMessage] = useState('');

  // 여기에 프롭스로 소켓 넘겨주기
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket?.emit('onSend', {
      nickname: nickname,
      msg: chatMessage,
      profile: profile,
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
            disabled={chatMessage.length === 0}
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
