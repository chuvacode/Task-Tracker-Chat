import React from 'react';
import {connect} from 'react-redux';
import ChatHeader from './ChatHeader';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {deleteMessages} from '../../../state/chat/operations';
import {allUnselect} from '../../../state/chat/actions';

const ChatHeaderContainer = props => <ChatHeader {...props} />;

const mapStateToProps = state => {
  const dialog = (state.chat.dialogs.filter(dialog => {
    if (dialog.id === state.chat.currentDialogID) {
      return dialog;
    }
  }))[0];

  return {
    name: dialog.name,
    description: dialog.description,
    selectedMessageIds: state.chat.selectedMessageIds,
  };
};

export default compose(
  connect(mapStateToProps, {allUnselect, deleteMessages}),
  withRouter)
(ChatHeaderContainer);
