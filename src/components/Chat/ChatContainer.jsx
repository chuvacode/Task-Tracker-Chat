import {connect} from "react-redux";
import Chat from "./Chat";

let mapStateToProps = state => {
  return {
    messages: state.chat.messages,
    profileId: state.profile.profileId
  };
};

let mapDispatchToProps = dispatch => {
  return {
  };
};

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;

