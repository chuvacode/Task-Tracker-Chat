import React from "react";
import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {sendMessage} from "../../../redux/chat-reducer";
import {reduxForm} from "redux-form";
import {compose} from "redux";

const ChatInputContainer = Component => props => {
  const handleSubmit = formData => {
    props.sendMessage(formData.message)
  };

  return <Component onSubmit={handleSubmit}/>
};

export default compose(
  connect(null, {
    sendMessage
  }),
  ChatInputContainer,
  reduxForm({form: 'chat-input'})
)(ChatInput)


