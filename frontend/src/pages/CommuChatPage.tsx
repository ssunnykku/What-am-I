import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BigBox } from '../assets/styles/common/commonComponentStyle';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';
import { CommunityType } from '../types/community/communityType';
import { getCurrentCommunityRequest } from '../apis/communityFetcher';
import { Socket, io } from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import CommuChatInput from '../components/chat/CommuChatInput';
import { getUserData } from '../apis/mypageFetcher';
import CommuChatLog from '../components/chat/CommuChatLog';

interface UserInfoType {
  email: string;
  nickname: string;
  profileImg: string;
  userId: string;
}

const CommuChat = () => {
  const [nickname, setNickname] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [chatProfile, setChatProfile] = useState<string>('');
  const [commuChatInfo, setCommuChatInfo] = useState<CommunityType>();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [inputChatMsg, setInputChatMsg] = useState<string>('');

  // 커뮤니티 아이디 가져오기
  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };
  const id = getParameter('id');

  // 커뮤니티 정보 가져오기
  const getCommuChatInfo = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);
    setCommuChatInfo(res);
  };
  const getUserInfo = async () => {
    const res = await getUserData();
    setNickname(res.nickname);
    setUserId(res.userId);
    setChatProfile(res.profileImg);
  };
  useEffect(() => {
    getCommuChatInfo();
    getUserInfo();
  }, []);

  // ###### socket.io 부분 ######

  const [currSocket, setCurrSocket] = useState<Socket>();
  const chatUserInfo = {
    roomName: id,
    nickname: nickname,
    userId: userId,
    profile: chatProfile,
  };

  useEffect(() => {
    setCurrSocket(socketIOClient('http://localhost:3500'));
  }, []);

  if (currSocket) {
    currSocket.on('connect', () => {
      currSocket.emit('join', chatUserInfo);
    });
  }

  // socket.on('test', (socket) => {
  //   console.log(socket, 'test 소켓');
  // });

  // const handleRequestSocket = () => {
  //   const res = socket.emit('test', {
  //     data: 'test socket on client',
  //   });
  //   console.log(res);
  // };

  // function handleChange() {
  //   console.log('change handle');
  // }

  // const postChatMsg = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   socket.emit('chat message', inputChatMsg);
  //   console.log('내가 보내는 채팅', inputChatMsg);
  //   setInputChatMsg('');
  // };

  return (
    <BigBox>
      <ChatBox>
        <header>
          <div className="chat-image">
            <img src={commuChatInfo?.communityImage} />
          </div>
          <div className="chat-name">{commuChatInfo?.name}</div>
        </header>
        <ContentsBox>
          <CommuChatLog socket={currSocket} />
        </ContentsBox>
        <CommuChatInput
          nickname={nickname}
          profile={chatProfile}
          socket={currSocket}
        />
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
  height: 78%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
