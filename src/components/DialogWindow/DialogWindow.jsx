import Style from "./DialogWindow.module.css";
import Message from "../Chat/Message/Message";
import ChatInputContainer from "../Chat/ChatInput/ChatInputContainer";
import React from "react";

let DialogWindow = props => {
  return (
    <div className={Style.dialogWindow}>
      <div className={Style.dialogWindowHeader}>
        <div className={Style.dialogWindowHeader__title}>{props.dialog.name}</div>
        <div className={Style.dialogWindowHeader__subtitle}>{props.dialog.description}</div>
      </div>

      <div className={Style.messenger}>
        {props.dialog.messages.map(message => (
            <Message key={message.id}
                     profileImage={message.profile.image}
                     profileName={message.profile.name}
                     timeSending={message.timeSending}
                     messageText={message.messageText}
                     ownerId={message.profile.id}
                     myId={props.profileId}
            />
          )
        )}
      </div>

      <ChatInputContainer/>
    </div>
  )
};

export default DialogWindow;
