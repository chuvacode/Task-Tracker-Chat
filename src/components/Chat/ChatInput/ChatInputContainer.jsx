import React from "react";
import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {sendMessage} from "../../../redux/chat-reducer";
import {reduxForm} from "redux-form";

class ChatInputContainer extends React.Component {

  handleSubmit = formData => {
    this.props.sendMessage(formData.message)
  };

  render() {
    return <WrappedReduxFormChatInput onSubmit={this.handleSubmit}/>
  }

}

let WrappedReduxFormChatInput = reduxForm({form: 'chat-input'})(ChatInput);
export default connect(null, {
  sendMessage
})(ChatInputContainer);


