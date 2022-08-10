import React, {FC, useEffect} from 'react';
// @ts-ignore
import Style from './ChatsManager.module.css';
import {NavLink} from 'react-router-dom';
import {Dialog} from '../../../state/chat/models';

type Props = {
    dialogs: Array<Dialog>
    activeTab: string,
    currentDialogID: number | null,
    activeDialog: (chat_id: number) => void,
    getChats: () => void,
}

const ChatManager: FC<Props> = (props: Props) => {

    const {
        dialogs,
        activeTab,
        currentDialogID,
        activeDialog,
        getChats,
    } = props;

    useEffect(() => {
        getChats();
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
                {dialogs.map(dialog => {
                    if (dialog.type === activeTab) {
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

export default ChatManager;
