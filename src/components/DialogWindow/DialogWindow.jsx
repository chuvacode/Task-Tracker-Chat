import Style from "./DialogWindow.module.css";
import Message from "../Chat/Message/Message";
import ChatInputContainer from "../Chat/ChatInput/ChatInputContainer";
import React, {createRef} from "react";
import loader from "../../assets/loader.svg";

let refDialog = createRef();

class DialogWindow extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    refDialog.current.scrollTop = refDialog.current.scrollHeight - refDialog.current.offsetHeight;
  }

  isDone() {
    return !this.props.isLoadingChatIds.some(chat_id => chat_id === this.props.dialog.id);
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
            {
              this.isDone() && this.props.dialog.messages.map(message => {
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
              })
            }

            { !this.isDone() && <img src={loader} className={Style.loader} alt="loader" /> }

            {
              this.isDone() && this.props.dialog.messages.length === 0 &&
              <div className={Style.empty}>Нет сообщений</div>
            }
          </div>
          <ChatInputContainer/>
        </div>
      );
    } else {
      return (
        <div className={Style.dialogWindow}>
          <div className={Style.dialogWindowHeader}>
            <div className={Style.dialogWindowHeader__title}></div>
            <div className={Style.dialogWindowHeader__subtitle}></div>
          </div>
          <div className={Style.messenger} ref={refDialog}>
            <div className={Style.empty}>Выберите диалог</div>
          </div>
          <ChatInputContainer/>
        </div>
      )
    }

  }

}

export default DialogWindow;
