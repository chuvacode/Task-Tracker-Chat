import React, {ComponentType, FC} from 'react';
import {connect} from 'react-redux';
import ChatInput from './ChatInput';
import {reduxForm, reset} from 'redux-form';
import {compose} from 'redux';
import {chatOperations} from '../../../state/chat';

type MapDispatchToProps = {
  sendMessage: (message: string) => void,
}

type Props = MapDispatchToProps;

const ChatInputContainer = <P extends object>(Component: ComponentType<P>) => (props: P & Props) => {

  const handleSubmit = (formData: any) => {
    props.sendMessage(formData.message);
  };

  return <Component onSubmit={handleSubmit} {...props as P} />;
};

export default compose(
  connect(null, {
    sendMessage: chatOperations.sendMessage,
  }),
  ChatInputContainer,
  reduxForm({form: 'chat-input', onSubmitSuccess: (result, dispatch) => {dispatch(reset('chat-input'));}}),
)(ChatInput) as React.ComponentType;


