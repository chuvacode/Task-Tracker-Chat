import {connect} from "react-redux";
import DialogsManager from "./DialogsManager";
import {activeDialog, getChats} from "../../redux/chat-reducer";
import React from "react";

class DialogsManagerContainer extends React.Component {

  componentDidMount() {
    this.props.getChats();
  }

  render() {
    return <DialogsManager {...this.props} />;
  }
}

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
})(DialogsManagerContainer);

