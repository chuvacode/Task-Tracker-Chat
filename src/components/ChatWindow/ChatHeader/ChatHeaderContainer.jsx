import React from "react";
import {connect} from "react-redux";
import ChatHeader from "./ChatWindow";

import {withRouter} from "react-router-dom";

class ChatHeaderContainer extends React.Component {
  render() {
    return <ChatHeader {...this.props} />
  }
}

let mapStateToProps = state => {
  return {
    dialog: (state.chat.dialogs.filter(dialog => {
      if (dialog.id === state.chat.currentDialogID) {
        return dialog;
      }
    }))[0],
    profiles: state.chat.profiles,
    profileId: state.profile.profileId,
    isLoadingChatIds: state.chat.isLoadingChatIds
  }
};

export default connect(mapStateToProps)(withRouter(ChatHeaderContainer));
