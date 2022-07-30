import Style from "./DialogWindow.module.css";
import Message from "../Chat/Message/Message";
import ChatInputContainer from "../Chat/ChatInput/ChatInputContainer";
import React, {createRef} from "react";

let refDialog = createRef();

class DialogWindow extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    //refDialog.current.scrollTop = refDialog.current.scrollHeight - refDialog.current.offsetHeight;
  }

  render() {
    if (this.props.dialog) {
      return (
        <div className={Style.dialogWindow}>
          <div className={Style.dialogWindowHeader}>
            <div className={Style.dialogWindowHeader__title}>{this.props.dialog.name}</div>
            <div className={Style.dialogWindowHeader__subtitle}>{this.props.dialog.description}</div>
          </div>
          <div className={Style.messenger} ref={refDialog}>
            {(this.props.dialog.messages && this.props.profiles.length > 0) && this.props.dialog.messages.map(message => {

                let profile = (this.props.profiles.filter(profile => {
                  if (profile.id === message.owner_id) {
                    return profile;
                  }
                }))[0];

                return <Message key={message.id}
                                profileImage={profile.image}
                                profileName={profile.name}
                                timeSending={message.timeSending}
                                messageText={message.messageText}
                                ownerId={profile.id}
                                myId={this.props.profileId}
                />
              }
            )}
          </div>
          <ChatInputContainer/>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }

  }

}

export default DialogWindow;
