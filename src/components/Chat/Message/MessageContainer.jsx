import React from "react";
import {connect} from "react-redux";
import Message from "./Message";
import {deleteMessages} from "../../../redux/chat-reducer";

class MessageContainer extends React.Component {
  render() {
    return <Message {...this.props} />
  }
}

export default connect(null, {
  deleteMessages
})(MessageContainer);

