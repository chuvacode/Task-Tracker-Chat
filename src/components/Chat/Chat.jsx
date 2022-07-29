import React from "react";
import Style from "./Chat.module.css"
import DialogWindowContainer from "../DialogWindow/DialogWindowContainer";
import DialogsManagerContainer from "../DialogsManager/DialogsManagerContainer";

let Chat = props => {
  return (
    <div className={Style.chatContainer}>
      <DialogsManagerContainer/>
      <DialogWindowContainer/>
    </div>
  );
};

export default Chat;
