import React, {FC} from 'react';
import {connect} from 'react-redux';
import Message from './Message';
import {chatActions, chatOperations, chatSelectors} from '../../../state/chat';
import {RootState} from '../../../state/store';

type MapOwnToProps = {
  ownerId: number
  myId: number | null
  messageId: number
  text: string
  profileImage: string
  profileName: string
  timeSending: string
}

type MapStateToProps = {
  selectedMessageIds: Array<number>
}

type MapDispatchToProps = {
  deleteMessages: () => void
  toggleSelectMessage: (message_id: number) => void
}

type Props = MapOwnToProps & MapStateToProps & MapDispatchToProps;
const MessageContainer: FC<Props> = props => <Message {...props} />;

const mapStateToProps = (state: RootState): MapStateToProps => ({
  selectedMessageIds: chatSelectors.getSelectedMessageIDs(state),
});

export default connect(mapStateToProps, {
  deleteMessages: chatOperations.deleteMessages,
  toggleSelectMessage: chatActions.toggleSelectMessage,
})(MessageContainer);

