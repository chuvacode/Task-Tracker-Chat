import React from "react";
import {connect} from "react-redux";
import DialogWindow from "./DialogWindow";

class DialogWindowContainer extends React.Component {
  render() {
    return <DialogWindow
      dialog={this.props.dialog}
      profileId={this.props.profileId}
      profiles = {this.props.profiles}
    />
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
    profileId: state.profile.profileId
  }
};

export default connect(mapStateToProps)(DialogWindowContainer);
