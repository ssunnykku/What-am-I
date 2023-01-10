import styled from 'styled-components';
import { BigBox } from '../assets/styles/common/commonComponentStyle';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';
import { CurrentCommuityProps } from '../components/modal/CommuContentsModal';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { BottomBox, InputBox } from './ChatRoomPage';

const CommuChat = ({ commuInfo }: CurrentCommuityProps) => {
  return (
    <BigBox>
      <ChatBox>
        <ContentsBox>{commuInfo?.name}채팅방 사진 + 이름...</ContentsBox>
        <BottomBox>
          <InputBox>
            <div className="input-container">
              <input placeholder="메시지를 입력해주세요..." />
              <div>
                <ImageOutlinedIcon
                  style={{
                    fontSize: '30px',
                    width: '40px',
                  }}
                />
              </div>
              <button style={{ width: '10%', marginLeft: '5px' }}>
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
  height: 97%;
  max-width: 950px;
  min-width: 450px;
  background-color: ${theme.backColor};
  margin: 10px 0;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const ContentsBox = styled.div`
  border: solid 1px purple;
  padding: 5px;
  font-family: ${font.normal};
  border-radius: 5px;
`;
