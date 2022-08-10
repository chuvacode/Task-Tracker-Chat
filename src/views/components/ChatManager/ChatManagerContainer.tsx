import {connect} from 'react-redux';
import ChatManager from './ChatManager';
import React, {FC} from 'react';
import {Dialog} from '../../../state/chat/models';
import {RootState} from '../../../state/store';
import {compose} from 'redux';
import {chatOperations} from '../../../state/chat';

type MapStateToProps = {
    dialogs: Array<Dialog>
    activeTab: string,
    currentDialogID: number | null,
}

type MapDispatchToProps = {
    activeDialog: (chat_id: number) => void,
    getChats: () => void,
}

const ChatManagerContainer: FC<MapStateToProps & MapDispatchToProps> = (props) => <ChatManager {...props} />;

const mapStateToProps = (state: RootState): MapStateToProps => ({
    dialogs: state.chat.dialogs,
    activeTab: state.chat.activeTab,
    currentDialogID: state.chat.currentDialogID,
});

export default compose(
    connect<MapStateToProps, MapDispatchToProps, unknown, RootState>(mapStateToProps, {
        activeDialog: chatOperations.activeDialog,
        getChats: chatOperations.getChats,
    }),
)(ChatManagerContainer);
