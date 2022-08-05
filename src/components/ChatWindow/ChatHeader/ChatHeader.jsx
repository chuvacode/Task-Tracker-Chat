import Style from "./ChatHeader.module.css";
import React from "react";

const ChatHeader = ({name, description}) => {
  return (
    <div className={Style.chatWindowHeader}>
      <div className={Style.chatWindowHeader__title}>{name}</div>
      <div className={Style.chatWindowHeader__subtitle}>{description}</div>
    </div>
  );
};

export default ChatHeader;
