import React, {FC} from 'react';
// @ts-ignore
import Style from './ChatPage.module.css';
import ChatWindowContainer from '../../components/ChatWindow/ChatWindowContainer';
import ChatManager from '../../components/ChatManager/ChatManager';

const ChatPage: FC = () => {
  return (
    <div className={Style.chatContainer}>
      <ChatManager/>
      <ChatWindowContainer/>
    </div>
  );
};

export default ChatPage;
