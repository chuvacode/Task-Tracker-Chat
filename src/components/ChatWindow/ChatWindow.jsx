import React, {createRef} from "react";
import Style from "./ChatWindow.module.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatInputContainer from "../Chat/ChatInput/ChatInputContainer";
import Loader from "../common/Loader/Loader";
import MessageContainer from "../Chat/Message/MessageContainer";

const ChatWindow = props => {
  const refDialog = createRef();

  // useEffect(() => {
  //   refDialog.current.scrollTop = refDialog.current.scrollHeight - refDialog.current.offsetHeight;
  // }, [props.dialog]);

  const isDone = () => {
    return !props.isLoadingChatIds.some(chat_id => chat_id === props.dialog.id);
  };

  return (
    <div className={Style.chatWindow}>
      {props.dialog && <>
        <ChatHeader name={props.dialog.name} description={props.dialog.description}/>
        <div className={Style.messenger} ref={refDialog}>

          {isDone() && props.dialog.messages.map(message => {
            let profile = (props.profiles.filter(profile => {
              if (profile.id === message.owner_id) {
                return profile;
              }
            }))[0];

            return <MessageContainer key={message.id}
                                     messageId={message.id}
                                     profileImage={profile.image}
                                     profileName={profile.name}
                                     timeSending={message.timeSending}
                                     messageText={message.messageText}
                                     ownerId={profile.id}
                                     myId={props.profileId}/>
          })}

          {!isDone() && <Loader/>}

          {isDone() && props.dialog.messages.length === 0 && (
            <div className={Style.empty}>Нет сообщений</div>
          )}

          <ChatInputContainer/>
        </div>
      </>}

      {!props.dialog && <>
        <div className={Style.empty}>Выберите диалог</div>
      </>}
    </div>
  );
};

export default ChatWindow;
