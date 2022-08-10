import React, {FC} from 'react';
// @ts-ignore
import Style from './Chat.module.css';
import ChatWindowContainer from '../ChatWindow/ChatWindowContainer';
import ChatManagerContainer from '../ChatManager/ChatManagerContainer';

const Chat: FC = () => (
  <div className={Style.chatContainer}>
    <ChatManagerContainer/>
    <ChatWindowContainer/>
  </div>
);

export default Chat;
