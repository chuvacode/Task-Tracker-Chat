import React, {useEffect} from 'react';
import Style from './ChatsManager.module.css';
import {NavLink} from 'react-router-dom';

const ChatsManager = props => {

  useEffect(() => {
    props.getChats();
  }, []);

  return (
    <div className={Style.chatsManager}>
      <div className={Style.chatsManagerHeader}>
        <div className={`${Style.chatsManagerHeader__item} ${Style.active}`}>Обсуждения</div>
        <div className={`${Style.chatsManagerHeader__item}`}>Контакты</div>
      </div>
      <div className={Style.search}>
        <input type="text" placeholder="Поиск"/>
      </div>
      <div className={Style.dialogs}>
        {props.dialogs.map(dialog => {
          if (dialog.type === props.activeTab) {
            return (
              <NavLink to={`/chat/${dialog.id}`} className={Style.dialog + ' ' + (dialog.id === props.currentDialogID ? Style.active : '')}
                   onClick={() => {
                     props.activeDialog(dialog.id);
                   }}
                   key={dialog.id}>
                <img className={Style.dialog__image} src={dialog.image} alt={''}/>
                <div className={Style.dialog__info}>
                  <div className={Style.dialog__title}>{dialog.name}</div>
                  <div className={Style.dialog__subtitle}>{dialog.description}</div>
                </div>
                {/*<div className={Style.dialog__note}>
                  <div className={Style.date}>25 Фев</div>
                  <div className={Style.countNewMessage}>3</div>
                </div>*/}
              </NavLink>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatsManager;
