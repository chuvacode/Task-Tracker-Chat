import {connect} from "react-redux";
import Message from "./Message";

let mapStateToProps = state => {
  return {
    profileImage: "",
    timeSending: "",
    messageText: ""
  };
};

let mapDispatchToProps = dispatch => {
  return {
  };
};

const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message);

export default MessageContainer;

