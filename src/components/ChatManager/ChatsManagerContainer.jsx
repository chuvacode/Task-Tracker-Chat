import {connect} from 'react-redux';
import ChatsManager from './ChatsManager';
import React from 'react';
import {activeDialog, getChats} from '../../state/chat/operations';

const ChatsManagerContainer = props => <ChatsManager {...props} />;

const mapStateToProps = state => {
  return {
    dialogs: state.chat.dialogs,
    activeTab: state.chat.activeTab,
    currentDialogID: state.chat.currentDialogID,
    isLoadingProfiles: state.chat.isLoadingProfiles,
  };
};

export default connect(mapStateToProps, {
  activeDialog,
  getChats,
})(ChatsManagerContainer);

