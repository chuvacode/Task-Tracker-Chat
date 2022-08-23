import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import Style from './ChatsManager.module.css';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {chatSelectors} from '../../../state/chat';
import classNames from 'classnames';
import {authSelectors} from '../../../state/auth';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';

const ChatManager: FC = () => {
  const [term, setTerm] = useState('');
  const activeTab = useAppSelector(chatSelectors.getActiveTab);
  const currentDialogID = useAppSelector(chatSelectors.getCurrentDialogID);
  const dialogs = useAppSelector(chatSelectors.getDialogs);
  const myID = useAppSelector(authSelectors.getProfileID);

  let filteredDialog = dialogs.filter(dialog => dialog.type === activeTab);

  if (term !== '') {
    filteredDialog = filteredDialog.filter(dialog => {
      return dialog.name.includes(term) || dialog.description.includes(term);
    });
  }

  const {setActiveTab} = useActions();
  const {getChats, activeDialog} = useActions();

  const history = useHistory();
  const params = useParams<{id: string}>();


  useEffect(() => {
    if (dialogs.length === 0) {
      getChats();
    }
  }, [dialogs]);

  // Initialize chat
  useEffect(() => {
    if (params.id) {
      activeDialog(+params.id);
    } else if (currentDialogID) {
      activeDialog(currentDialogID);
      history.push(`/chat/${currentDialogID}`);
    }
  }, [dialogs, params]);

  const handlerTabContacts = () => {
    setActiveTab('contact');
  };

  const handlerTabGroups = () => {
    setActiveTab('group');
  };

  const classesTabGroup = classNames(Style.chatsManagerHeader__item, {[`${Style.active}`]: activeTab === 'group'});
  const classesTabContact = classNames(Style.chatsManagerHeader__item, {[`${Style.active}`]: activeTab === 'contact'});

  return (
    <div className={Style.chatsManager}>
      <div className={Style.chatsManagerHeader}>
        <div className={classesTabGroup} onClick={handlerTabGroups}>Обсуждения</div>
        <div className={classesTabContact} onClick={handlerTabContacts}>Контакты</div>
      </div>
      <div className={Style.search}>
        <input type="text" placeholder="Поиск" value={term} onChange={e => setTerm(e.currentTarget.value)}/>
      </div>
      <div className={Style.dialogs}>
        {filteredDialog.map(dialog => {

          let countUnread = 0; // dialog.count_unread

          dialog.messages?.forEach(message => {
            if (message.owner_id !== myID) {

              if (message.events?.length === 0) {
                countUnread++;
              } else if (!message.events.some((event: any) => event.type === 'read' && event.user_id === myID)) {
                countUnread++;
              }
            }
          });

          return (
            <NavLink to={`/chat/${dialog.id}`}
                     className={Style.dialog + ' ' + (dialog.id === currentDialogID ? Style.active : '')}
                     onClick={() => {
                       activeDialog(dialog.id);
                     }}
                     key={dialog.id}>
              <img className={Style.dialog__image} src={dialog.image} alt={''}/>
              <div className={Style.dialog__info}>
                <div className={Style.dialog__title}>{dialog.name}</div>
                <div className={Style.dialog__subtitle}>{dialog.description}</div>
              </div>
              <div className={Style.dialog__note}>
                {/*<div className={Style.date}>25 Фев</div>*/}
                {countUnread > 0 && <div className={Style.countNewMessage}>{countUnread}</div>}
              </div>
            </NavLink>
          );
        })}

        {filteredDialog.length === 0 && <div className={Style.emptyChatList}>Диалогов не найдено</div>}
      </div>
    </div>
  );
};

export default ChatManager;
