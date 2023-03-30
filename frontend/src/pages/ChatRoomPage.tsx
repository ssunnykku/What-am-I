import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../assets/styles/common/palette';
import { font } from '../assets/styles/common/fonts';
import { BigBox } from '../assets/styles/common/commonComponentStyle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Storage from '../storage/storage';
import SearchMsgModal from '../components/modal/SearchMsgModal';
import { getFollowingBuddyData, getUserData } from '../apis/mypageFetcher';
import { BuddyType } from '../types/community/communityType';

const ChatRoomPage = () => {
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const getUserInfo = async () => {
    const res = await getUserData();
    setNickname(res.nickname);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // setUploadImages([...previews, e.target.files[0]]);

      reader.onload = () => {
        const previewUrl = reader.result as string;

        if (previewUrl) {
          setPreviews([...previews, previewUrl]);
        }
      };
    }
  };

  const handleDeletePreview = (index: number) => {
    setPreviews(previews.filter((_, idx) => idx !== index));
  };

  return (
    <BigBox>
      <RoomBox>
        <ChatList>
          <header>
            <>
              {nickname}
              <div className="msg-icon">
                <SearchMsgModal />
              </div>
            </>
          </header>
          <BuddyChat>
            <img src="img/강아지.png" />
            <div className="profile-box">
              <div>상대방 닉네임</div>
              <div className="preview-chat">blah blah blah blah...</div>
            </div>
          </BuddyChat>
        </ChatList>
        <ChatPlace>
          <header>
            <div className="profile">
              <img />
            </div>
            <div>상대방 닉네임</div>
          </header>
          <BottomBox>
            <InputBox className={previews.length !== 0 ? 'add-div' : ''}>
              {previews.length !== 0 ? (
                <ImageContainer>
                  {previews.map((preview, index) => (
                    <ImagePlace key={index}>
                      <img src={preview} />
                      <button onClick={() => handleDeletePreview(index)}>
                        X
                      </button>
                    </ImagePlace>
                  ))}
                </ImageContainer>
              ) : null}
              <div className="input-container">
                <input
                  type="text"
                  placeholder="메시지를 입력해주세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="pre-img"
                    ref={imageInputRef}
                    onChange={handleUploadFile}
                    hidden
                    multiple
                  />
                  <label htmlFor="pre-img">
                    <ImageOutlinedIcon
                      style={{
                        fontSize: '30px',
                        width: '35px',
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                </div>
                <button disabled={message.length === 0}>
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
  min-width: 480px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  border-radius: 10px;
  background-color: ${theme.backColor};
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.2);

  header {
    height: 3.5rem;
    border-bottom: solid 1px lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-family: ${font.bold};

    .msg-icon {
      text-align: center;
      width: 2rem;
      height: 1.4rem;
      margin-left: 7px;
    }
  }
`;

const ChatList = styled.div`
  border-right: solid 1px lightgray;
  font-family: ${font.normal};
  margin: 5px 0;
  letter-spacing: 3px;
  min-width: 300px;
`;

const BuddyChat = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  border-bottom: solid 1px lightgray;
  padding: 0 10px;

  img {
    height: 47px;
    width: 47px;
    border-radius: 50%;
    margin-left: 10px;
  }

  .profile-box {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    margin-left: 2px;
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

  .add-div {
    height: 250px;
    display: flex;
    /* padding-right: 8px; */
  }

  .profile {
    width: 1.6rem;
    height: 1.6rem;
    border: solid 1px gray;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
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
  border-radius: 10px;
  margin: 0 5px;

  .input-container {
    width: 98%;
    height: 50px;
    margin: 0 5px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-top: solid 1px lightgray;

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

    :hover {
      cursor: pointer;
      color: ${theme.mainColor};
    }

    &[disabled] {
      color: gray;
      cursor: revert;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  overflow-x: scroll;
  padding-left: 10px;
`;

const ImagePlace = styled.div`
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 200px;
  min-width: 200px;
  margin-right: 10px;
  border-radius: 5px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    z-index: 9;
    position: absolute;
    right: 0;
    width: 35px;
    height: 35px;
    font-family: ${font.bold};
    font-size: 20px;
    border: 0;
    background-color: transparent;
    color: tomato;
  }
`;
