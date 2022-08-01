import React from "react";
import {connect} from "react-redux";
import Chat from "./Chat";
import {setProfile} from "../../redux/profile-reducer";

class ChatContainer extends React.Component {
  render() {
    return <Chat/>
  }
}

let mapStateToProps = state => {
  return {
    messages: state.chat.messages,
    profileId: state.profile.profileId
  };
};

export default connect(mapStateToProps)(ChatContainer);

