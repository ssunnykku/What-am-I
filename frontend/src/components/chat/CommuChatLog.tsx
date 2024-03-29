import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { ContentsProfile } from '../../assets/styles/common/commonComponentStyle';

export interface socketProps {
  socket?: Socket;
  nickname?: string;
  profile?: string;
  userId?: string;
}
interface msgListType {
  msg: string;
  nickname: string;
  profile: string;
  userId: string;
}

const CommuChatLog = ({ socket }: socketProps) => {
  const [msgList, setMsgList] = useState<msgListType[]>([]);

  useEffect(() => {
    if (socket) {
      // socket.on('chatLog', (chatData) => {
      //   // setMsgList((chatData) => [...chatData]);
      //   console.log(chatData);
      // });
      socket.on('onReceive', (lastMessages) => {
        setMsgList((msgList) => [...msgList, ...lastMessages]);
        // console.log(messageItem);
        console.log(lastMessages);
      });

      // socket.on('onConnect', (systemMessage) => {
      //   setMsgList((msgList): any => [...msgList, { msg: systemMessage }]);
      // });
      // socket.on('onDisconnect', (systemMessage) => {
      //   setMsgList((msgList): any => [...msgList, { msg: systemMessage }]);
      // });
      return () => {
        socket.disconnect();
      };
    }
    // 여기가 문제?? (socket이 여러번 불러와지고있음)
  }, [socket]);

  return (
    <>
      <div>
        {msgList.map((msg, idx) => (
          <ChatBubble key={idx}>
            <ChatProfile>
              <div className="profile">
                <img src={msg.profile} />
              </div>
              <div>{msg.nickname}</div>
            </ChatProfile>
            <div>{msg.msg}</div>
          </ChatBubble>
        ))}
      </div>
    </>
  );
};

export default CommuChatLog;

const ChatBubble = styled.div`
  /* background-color: white;
  border-radius: 30px; */
  /* border-top: solid 1px lightgray; */
  margin: 10px 10px;
  padding-left: 3%;
`;

const ChatProfile = styled(ContentsProfile)`
  font-size: 15px;

  .profile {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;
