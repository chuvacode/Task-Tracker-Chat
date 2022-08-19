import React, {createRef, FC, useEffect} from 'react';
// @ts-ignore
import Style from './ChatWindow.module.css';
import ChatInputContainer from '../ChatInput/ChatInputContainer';
import Loader from '../common/Loader/Loader';
import MessageContainer from '../Message/MessageContainer';
import ChatHeaderContainer from '../ChatHeader/ChatHeaderContainer';
import {Dialog, Profile} from '../../../state/chat/models';

type Props = {
  dialog: Dialog
  profiles: Array<Profile>
  currentProfileID: number | null
  isLoadingChatIDs: Array<number>
}

const ChatWindow: FC<Props> = ({dialog, profiles, isLoadingChatIDs, currentProfileID, ...props}) => {
  const refDialog = createRef<HTMLDivElement>();

  useEffect(() => {
    if (refDialog.current)
      refDialog.current.scrollTop = refDialog.current.scrollHeight - refDialog.current.offsetHeight;
  }, [dialog, profiles]);

  const isDone = () => {
    return !isLoadingChatIDs.some(chat_id => chat_id === dialog.id);
  };

  return (
    <div className={Style.chatWindow}>
      {dialog && <>
        <ChatHeaderContainer />
        <div className={Style.messenger} ref={refDialog}>

          {isDone() && dialog.messages && dialog.messages.map(message => {
            const profile = (profiles.filter(profile => {
              if (profile.id === message.owner_id) {
                return profile;
              }
            }))[0];

            return <MessageContainer key={message.id}
                                     messageId={message.id}
                                     timeSending={message.timeSending}
                                     text={message.message}
                                     profileImage={profile.image}
                                     profileName={profile.name}
                                     ownerId={profile.id}
                                     myId={currentProfileID}/>;
          })}

          {!isDone() && <Loader/>}

          {isDone() && dialog.messages && dialog.messages.length === 0 && (
            <div className={Style.empty}>Нет сообщений</div>
          )}
        </div>
        <ChatInputContainer/>
      </>}

      {!dialog && <>
        <div className={Style.empty}>Выберите диалог</div>
      </>}
    </div>
  );
};

export default ChatWindow;
