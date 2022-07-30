import {connect} from "react-redux";
import DialogsManager from "./DialogsManager";
import {formatterTime, setActiveDialogAC, setDialogsAC, setMessagesAC, setProfilesAC} from "../../redux/chat-reducer";
import React from "react";
import axios from "axios";

class DialogsManagerContainer extends React.Component {

  componentDidMount() {
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

let mapDispatchToProps = dispatch => {
  return {
    setActiveDialog(dialogID) {
      dispatch(setActiveDialogAC(dialogID));
    },
    setDialogs(dialogs) {
      dispatch(setDialogsAC(dialogs));
    },

    setProfiles(profiles) {
      dispatch(setProfilesAC(profiles))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsManagerContainer);

