import React from "react";
import {connect} from "react-redux";
import ChatHeader from "./ChatHeader";

import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {allUnselect, deleteMessages} from "../../../redux/chat-reducer";

class ChatHeaderContainer extends React.Component {
  render() {
    return <ChatHeader {...this.props} />
  }
}

let mapStateToProps = state => {
  const dialog = (state.chat.dialogs.filter(dialog => {
    if (dialog.id === state.chat.currentDialogID) {
      return dialog;
    }
  }))[0];

  return {
    name: dialog.name,
    description: dialog.description,
    selectedMessageIds: state.chat.selectedMessageIds
  };
};

export default compose(
  connect(mapStateToProps, {allUnselect, deleteMessages}),
  withRouter)
(ChatHeaderContainer);
