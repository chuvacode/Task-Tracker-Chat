import {connect} from "react-redux";
import ChatsManager from "./ChatsManager";
import {activeDialog, getChats} from "../../redux/chat-reducer";
import React from "react";

const ChatsManagerContainer = props => <ChatsManager {...props} />;

let mapStateToProps = state => {
  return {
    dialogs: state.chat.dialogs,
    activeTab: state.chat.activeTab,
    currentDialogID: state.chat.currentDialogID,
    isLoadingProfiles: state.chat.isLoadingProfiles
  };
};

export default connect(mapStateToProps, {
  activeDialog,
  getChats
})(ChatsManagerContainer);

