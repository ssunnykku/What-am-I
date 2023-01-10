import styled from 'styled-components';
import { theme } from '../assets/styles/common/palette';
import { font } from '../assets/styles/common/fonts';
import { BigBox } from '../assets/styles/common/commonComponentStyle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const ChatRoomPage = () => {
  return (
    <BigBox>
      <RoomBox>
        <ChatList>
          <header>내 닉네임</header>
          <BuddyChat>
            <img />
            <div className="profile-box">
              <div>닉네임</div>
              <div className="preview-chat">blah blah blah blah...</div>
            </div>
          </BuddyChat>
        </ChatList>
        <ChatPlace>
          <header>
            <img />
            <div>상대방 닉네임</div>
          </header>
          <BottomBox>
            <InputBox>
              <div className="input-container">
                <input placeholder="메시지를 입력해주세요..." />
                <div>
                  <ImageOutlinedIcon
                    style={{
                      fontSize: '30px',
                      width: '35px',
                    }}
                  />
                </div>
                <button>
                  <SendOutlinedIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                </button>
              </div>
            </InputBox>
          </BottomBox>
        </ChatPlace>
      </RoomBox>
    </BigBox>
  );
};

export default ChatRoomPage;

const RoomBox = styled.div`
  width: 50vw;
  height: 90%;
  min-width: 450px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  border-radius: 10px;
  background-color: ${theme.backColor};
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.2);
`;

const ChatList = styled.div`
  border-right: solid 1px lightgray;
  font-family: ${font.normal};
  margin: 5px 0;
  letter-spacing: 3px;
  min-width: 300px;

  header {
    height: 3.5rem;
    border-bottom: solid 1px lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
`;

const BuddyChat = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  border-bottom: solid 1px lightgray;
  padding: 0 10px;

  img {
    border: solid 1px gray;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .profile-box {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    font-size: 15px;
  }

  .preview-chat {
    color: gray;
    font-size: 14px;
    margin-top: 5px;
  }
`;

const ChatPlace = styled.div`
  margin: 5px 0;
  font-family: ${font.normal};
  letter-spacing: 3px;
  position: relative;

  header {
    height: 3.5rem;
    border-bottom: solid 1px lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;

    img {
      width: 1.6rem;
      height: 1.6rem;
      border: solid 1px gray;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
`;

export const BottomBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputBox = styled.div`
  border: solid 1px lightgray;
  background-color: white;
  position: absolute;
  width: 97%;
  height: 50px;
  bottom: 10px;
  border-radius: 20px;
  margin: 0 5px;

  .input-container {
    height: 50px;
    border-radius: 20px;
    margin: 0 5px;
    display: flex;
    align-items: center;

    input {
      height: 90%;
      width: 90%;
      border: 0;
      margin-left: 10px;
      font-size: 16px;

      :focus {
        outline: 0;
      }
    }
  }

  button {
    height: 80%;
    border: 0;
    border-left: solid 1px lightgray;
    background-color: white;
    font-family: ${font.normal};
    padding-left: 10px;
    color: gray;

    // 인풋 글자 길이 !==0
    /* color: black; */

    :hover {
      cursor: pointer;
      color: ${theme.mainColor};
    }
  }
`;
