import {connect} from 'react-redux';
import ChatManager from './ChatManager';
import React, {ComponentType, FC} from 'react';
import {Dialog} from '../../../state/chat/models';
import {RootState} from '../../../state/store';
import {compose} from 'redux';
import {chatOperations} from '../../../state/chat';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type MapStateToProps = {
  dialogs: Array<Dialog>
  activeTab: string,
  currentDialogID: number | null,
}

type MapDispatchToProps = {
  activeDialog: (chat_id: number) => void,
  getChats: () => void,
}

type Props = MapStateToProps & MapDispatchToProps & RouteComponentProps<{id?: string | undefined}>;

const ChatManagerContainer: FC<Props> = (props) => <ChatManager {...props} />;

const mapStateToProps = (state: RootState): MapStateToProps => ({
  dialogs: state.chat.dialogs,
  activeTab: state.chat.activeTab,
  currentDialogID: state.chat.currentDialogID,
});

export default compose<ComponentType>(
  connect<MapStateToProps, MapDispatchToProps, unknown, RootState>(mapStateToProps, {
    activeDialog: chatOperations.activeDialog,
    getChats: chatOperations.getChats,
  }),
  withRouter,
)(ChatManagerContainer);

