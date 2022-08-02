import React from "react";
import Style from "./Message.module.css"

let Message = props => {
  if (props.ownerId === props.myId) {
    return (
      <div className={Style.myMessage} onClick={() => {props.deleteMessages(props.messageId)}}>
        <div className={Style.messageContent}>
          <div className={Style.messageText}>{props.messageText}</div>
        </div>
        <div className={Style.messageInfo}>
          <div className={Style.messageTime}>{props.timeSending}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={Style.message}>
        <div className={Style.messageInfo}>
          <img className={Style.profileImage} src={props.profileImage} alt={''}/>
          <div className={Style.messageTime}>{props.timeSending}</div>
        </div>
        <div className={Style.messageContent}>
          <div className={Style.profileName}>{props.profileName}</div>
          <div className={Style.messageText}>{props.messageText}</div>
        </div>
      </div>
    );
  }
};

export default Message;
