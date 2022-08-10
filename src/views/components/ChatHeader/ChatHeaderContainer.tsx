import React, {FC} from 'react';
import {connect} from 'react-redux';
import ChatHeader from './ChatHeader';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {chatActions, chatOperations, chatSelectors} from '../../../state/chat';
import {RootState} from '../../../state/store';

type MapStateToProps = {
  name: string
  description: string
  selectedMessageIDs: Array<number>
}

type MapDispatchToProps = {
  allUnselect: () => void
  deleteMessages: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const ChatHeaderContainer: FC<Props> = props => <ChatHeader {...props} />;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    name: chatSelectors.getNameCurrentChat(state),
    description: chatSelectors.getDescriptionCurrentChat(state),
    selectedMessageIDs: chatSelectors.getSelectedMessageIDs(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    allUnselect: chatActions.allUnselect(),
    deleteMessages: chatOperations.deleteMessages}),
  withRouter)
(ChatHeaderContainer) as React.ComponentType;
