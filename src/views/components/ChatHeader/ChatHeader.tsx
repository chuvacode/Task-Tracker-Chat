import Style from './ChatHeader.module.css';
import React, {FC} from 'react';
import {declination} from '../../../utils';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../state/store';
import {chatActions, chatOperations, chatSelectors} from '../../../state/chat';
import {useAppSelector} from '../../../hooks/useAppSelector';

const ChatHeader: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const name = useAppSelector(chatSelectors.getNameCurrentChat);
  const description = useAppSelector(chatSelectors.getDescriptionCurrentChat);
  const selectedMessageIDs = useAppSelector(chatSelectors.getSelectedMessageIDs);
  const handlerUnselect = () => {
    dispatch(chatActions.allUnselect());
  };

  const handlerDeleteMessages = () => {
    dispatch(chatOperations.deleteMessages());
  };

  const isEmptySelectList = selectedMessageIDs.length === 0;
  return (
    <>
      {isEmptySelectList && (
        <div className={Style.chatWindowHeader}>
          <div className={Style.chatWindowHeader__title}>{name}</div>
          <div className={Style.chatWindowHeader__subtitle}>{description}</div>
        </div>)}

      {!isEmptySelectList && (
        <div className={Style.chatWindowHeader}>
          <div className={Style.actions}>
            <div className={Style.counter}>
              {selectedMessageIDs.length} {declination(selectedMessageIDs.length, ['сообщение', 'сообщения', 'сообщений'])}
              <button className={Style.btn} onClick={handlerUnselect}/>
            </div>

            <button className={Style.btnDelete} onClick={handlerDeleteMessages}>
              <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.7 6.5a.75.75 0 0 0-.7.8l.5 7a.75.75 0 0 0 1.5-.1l-.5-7a.75.75 0 0 0-.8-.7zm4.6 0a.75.75 0 0 1 .7.8l-.5 7a.75.75 0 0 1-1.5-.1l.5-7a.75.75 0 0 1 .8-.7z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M2.25 3a.75.75 0 0 0 0 1.5h1.07l.95 10.44c.05.49.09.9.14 1.23.06.35.15.68.33.98.28.47.7.85 1.19 1.08.32.16.65.22 1 .24.34.03.76.03 1.25.03h3.64c.5 0 .9 0 1.24-.03a2.8 2.8 0 0 0 1.01-.24 2.75 2.75 0 0 0 1.19-1.08c.18-.3.27-.63.33-.98.05-.33.1-.74.14-1.23l.96-10.44h1.06a.75.75 0 0 0 0-1.5h-4.59a3.25 3.25 0 0 0-6.32 0H2.25zm3.52 11.77c.04.53.08.88.12 1.15.05.26.1.38.15.47.12.21.3.38.53.49.1.04.22.08.48.1.28.02.63.02 1.16.02h3.58c.53 0 .88 0 1.16-.02.26-.02.39-.06.48-.1a1.25 1.25 0 0 0 .53-.5c.05-.08.1-.2.15-.46.04-.27.08-.62.12-1.15l.95-10.27H4.82l.95 10.27zM10 2c-.7 0-1.3.4-1.58 1h3.16A1.75 1.75 0 0 0 10 2z" fill="currentColor"></path></svg>
            </button>
          </div>
        </div>)}
    </>
  );
};

export default ChatHeader;
