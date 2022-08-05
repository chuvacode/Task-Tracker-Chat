import React from "react";
import Style from "./Message.module.css"

let Message = ({
                 ownerId, myId, messageId,
                 messageText, profileImage, profileName,
                 timeSending, toggleSelectMessage, selectedMessageIds
               }) => {

  const isOwn = ownerId === myId;
  const isSelected = selectedMessageIds.some(id => messageId === id);

  return (
    <div className={`${Style.messageContainer} ${isSelected ? Style.selected : ''}`}>
      <div className={`${isOwn ? Style.myMessage : Style.message}`} onClick={() => {
        toggleSelectMessage(messageId)
      }}>
        {!isOwn && (
          <div className={Style.messageInfo}>
            <img className={Style.profileImage} src={profileImage} alt={''}/>
            <div className={Style.messageTime}>{timeSending}</div>
          </div>
        )}
        <div className={Style.messageContent}>
          {!isOwn && <div className={Style.profileName}>{profileName}</div>}
          <div className={Style.messageText}>{messageText}</div>
        </div>
        {isOwn && (
          <div className={Style.messageInfo}>
            <div className={Style.messageTime}>{timeSending}</div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Message;
