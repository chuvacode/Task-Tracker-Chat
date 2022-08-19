import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import Style from './ChatsManager.module.css';
import {NavLink, RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {chatActions, chatOperations, chatSelectors} from '../../../state/chat';
import {DispatchWithThunk} from '../../../state/store';
import {ChatTab} from '../../../state/chat/reducers';
import classNames from 'classnames';
import {authSelectors} from '../../../state/auth';

const ChatManager: FC<RouteComponentProps<{ id?: string | undefined }>> = ({match}) => {
  const [term, setTerm] = useState('');
  const dispatch: DispatchWithThunk = useDispatch();
  const activeTab = useSelector(chatSelectors.getActiveTab);
  const currentDialogID = useSelector(chatSelectors.getCurrentDialogID);
  const dialogs = useSelector(chatSelectors.getDialogs);
  const myID = useSelector(authSelectors.getProfileID);

  let filteredDialog = dialogs.filter(dialog => dialog.type === activeTab);

  if (term !== '') {
    filteredDialog = filteredDialog.filter(dialog => {
      return dialog.name.includes(term) || dialog.description.includes(term);
    });
  }

  const setActiveTab = (tab: ChatTab) => {
    dispatch(chatActions.setActiveTab(tab));
  };
  const activeDialog = (chat_id: number) => {
    dispatch(chatOperations.activeDialog(chat_id));
  };
  const getChats = () => {
    dispatch(chatOperations.getChats());
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (match.params.id) {
      activeDialog(+match.params.id);
    } else if (currentDialogID) {
      activeDialog(currentDialogID);
    }
  }, [dialogs]);


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
              if (message.events.length === 0) {
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
