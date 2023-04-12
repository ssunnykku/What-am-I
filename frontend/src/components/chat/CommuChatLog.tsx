import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export interface socketProps {
  socket?: Socket;
  nickname?: string;
}
interface msgListType {
  msg: string;
  nickname: string;
  timeStamp: string;
}

const CommuChatLog = ({ socket }: socketProps) => {
  const [msgList, setMsgList] = useState<msgListType[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('onReceive', (messageItem) => {
        setMsgList((msgList) => [...msgList, messageItem]);
        console.log(messageItem);
      });
      socket.on('onConnect', (systemMessage) => {
        // setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
      });
      socket.on('onDisconnect', (systemMessage) => {
        // setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <>
      {msgList.map((msg, idx) => {
        <div key={idx}>
          <div>{msg.msg}</div>
        </div>;
      })}
    </>
  );
};

export default CommuChatLog;
