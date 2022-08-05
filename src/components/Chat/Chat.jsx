import React from "react";
import Style from "./Chat.module.css"
import ChatsManagerContainer from "../ChatManager/ChatsManagerContainer";
import ChatWindowContainer from "../ChatWindow/ChatWindowContainer";

const Chat = () => (
  <div className={Style.chatContainer}>
    <ChatsManagerContainer/>
    <ChatWindowContainer/>
  </div>
);

export default Chat;
