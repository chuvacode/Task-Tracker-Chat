import React from "react";
import {connect} from "react-redux";
import DialogWindow from "./DialogWindow";
import axios from "axios";
import {formatterTime, setMessagesAC} from "../../redux/chat-reducer";

class DialogWindowContainer extends React.Component {

  componentDidUpdate() {
    this.props.dialog && axios.get(`http://127.0.0.1:8000/api/v1/message/${this.props.dialog.id}`)
      .then(response => {
        let users_id = [];
        this.props.setMessages(this.props.dialog.id, response.data.items.map(message => {
          users_id.push(message.owner_id);
          return {
            id: message.id,
            messageText: message.message,
            timeSending: formatterTime(new Date(message.timestamp_sent)),
            owner_id: message.owner_id,
          }
        }));
      });
  }

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

let mapDispatchToProps = dispatch => {
  return {
    setMessages(chat_id, messages) {
      dispatch(setMessagesAC(chat_id, messages));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogWindowContainer);
