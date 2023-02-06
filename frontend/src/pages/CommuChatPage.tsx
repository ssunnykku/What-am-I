import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BigBox } from '../assets/styles/common/commonComponentStyle';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { BottomBox, InputBox } from './ChatRoomPage';
import { CommunityType } from '../types/community/communityType';
import { getCurrentCommunityRequest } from '../apis/communityFetcher';

const CommuChat = () => {
  const [message, setMessage] = useState<string>('');
  const [commuChatInfo, setCommuChatInfo] = useState<CommunityType>();

  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };
  const id = getParameter('id');

  const getCommuChatInfo = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);
    setCommuChatInfo(res);
  };

  useEffect(() => {
    getCommuChatInfo();
  }, []);

  return (
    <BigBox>
      <ChatBox>
        <header>
          <div className="chat-image">
            <img src={commuChatInfo?.communityImage} />
          </div>
          <div className="chat-name">{commuChatInfo?.name}</div>
        </header>
        <ContentsBox></ContentsBox>
        <BottomBox>
          <InputBox style={{ bottom: '20px' }}>
            <div className="input-container">
              <input
                type="text"
                placeholder="메시지를 입력해주세요..."
                value={message || ''}
                onChange={(e) => setMessage(e.target.value)}
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
                disabled={message.length === 0}
              >
                <SendOutlinedIcon
                  style={{
                    fontSize: '30px',
                  }}
                />
              </button>
            </div>
          </InputBox>
        </BottomBox>
      </ChatBox>
    </BigBox>
  );
};

export default CommuChat;

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

const ContentsBox = styled.div`
  padding: 5px;
  font-family: ${font.normal};
  border-radius: 5px;
`;
