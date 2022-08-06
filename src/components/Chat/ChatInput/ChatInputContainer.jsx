import React from "react";
import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {sendMessage} from "../../../redux/chat-reducer";
import {change, reduxForm} from "redux-form";
import {compose} from "redux";

const ChatInputContainer = props => {
  const handleSubmit = formData => {
    console.log(formData.message);
    props.sendMessage(formData.message)
  };

  return <WithReduxFormChatInput onSubmit={handleSubmit}/>
};

let WithReduxFormChatInput = reduxForm({form: 'chat-input'})(ChatInput);

export default compose(
  connect(null, {
    sendMessage,
    change
  })
)(ChatInputContainer)


