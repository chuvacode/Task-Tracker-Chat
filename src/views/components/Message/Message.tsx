import React, {FC} from 'react';
// @ts-ignore
import Style from './Message.module.css';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

type Props = {
    ownerId: number
    myId: number | null
    messageId: number
    text: string
    profileImage: string
    profileName: string
    timeSending: string
    toggleSelectMessage: (id: number) => void
    selectedMessageIds: Array<number>
    isRead: boolean
}

const Message: FC<Props> = (props) => {
    const {
        myId,
        ownerId,
        messageId,
        text,
        timeSending,
        profileName,
        profileImage,
        toggleSelectMessage,
        selectedMessageIds,
        isRead,
    } = props;

    const isOwn = ownerId === myId;
    const isSelected = selectedMessageIds.some(id => messageId === id);



    return (
        <div className={`${Style.messageContainer} ${isSelected ? Style.selected : ''}`}>
            <div className={`${isOwn ? Style.myMessage : Style.message}`} onClick={() => {
                toggleSelectMessage(messageId);
            }}>
                {!isOwn && (
                    <div className={Style.messageInfo}>
                        <img className={Style.profileImage} src={profileImage} alt={''}/>
                        <div className={Style.messageTime}>{timeSending}</div>
                    </div>
                )}
                <div className={Style.messageContent}>
                    {!isOwn && <div className={Style.profileName}>{profileName}</div>}
                    <div className={Style.messageText}>{text}</div>
                </div>
                {isOwn && (
                    <div className={Style.messageInfo}>
                        <CheckIcon fontSize={'small'} color={(isRead ? 'primary' : 'disabled')} />
                        {/*<DoneAllIcon fontSize={'small'} color={'primary'} />*/}
                        <div className={Style.messageTime}>{timeSending}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
