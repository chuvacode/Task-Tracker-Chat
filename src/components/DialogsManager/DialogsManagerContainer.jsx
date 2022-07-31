import {connect} from "react-redux";
import DialogsManager from "./DialogsManager";
import {formatterTime, setActiveDialog, setDialogs, setMessages, setProfiles} from "../../redux/chat-reducer";
import React from "react";
import axios from "axios";

class DialogsManagerContainer extends React.Component {

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/v1/chat")
      .then(response => {
        this.props.setDialogs(response.data.items.map(dialog => {
          return {
            id: dialog.id,
            type: dialog.type,
            name: dialog.meta.name,
            description: dialog.meta.description,
            image: dialog.meta.image_url,
            messages: []
          }
        }));

        axios.get(`http://127.0.0.1:8000/api/v1/message/${this.props.currentDialogID}`)
          .then(response => {
            let users_id = [];
            this.props.setMessages(this.props.currentDialogID, response.data.items.map(message => {
              users_id.push(message.owner_id);
              return {
                id: message.id,
                messageText: message.message,
                timeSending: formatterTime(new Date(message.timestamp_sent)),
                owner_id: message.owner_id,
              }
            }));

            axios.get("http://127.0.0.1:8000/api/v1/user")
              .then(response => {
                this.props.setProfiles(response.data.items.map(profile => {
                  return {
                    id: profile.id,
                    name: `${profile.first_name}  ${profile.last_name}`,
                    image: profile.avatar_url
                  };
                }))
              });
          });
      });
  }

  render() {
    return <DialogsManager
      dialogs={this.props.dialogs}
      activeType={this.props.activeType}
      currentDialogID={this.props.currentDialogID}
      setActiveDialog={this.props.setActiveDialog}
    />;
  }
}

let mapStateToProps = state => {
  return {
    dialogs: state.chat.dialogs,
    activeType: state.chat.activeType,
    currentDialogID: state.chat.currentDialogID,
  };
};

export default connect(mapStateToProps, {
  setActiveDialog, setDialogs, setMessages, setProfiles
})(DialogsManagerContainer);

