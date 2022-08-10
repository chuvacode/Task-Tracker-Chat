import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import ChatInput, {ChatInputFormData} from './ChatInput';
import {FormProps, reduxForm, reset} from 'redux-form';
import {compose} from 'redux';
import {chatOperations} from '../../../state/chat';

type MapDispatchToProps = {
  sendMessage: (message: string) => void,
}

type Props = MapDispatchToProps;

type HOK<P> = (WrappedComponent: ComponentType<Omit<P, 'sendMessage'> & FormProps<ChatInputFormData, P>>) => ComponentType<P>;

const ChatInputContainer:HOK<Props> = (WrappedComponent) => (props) => {
  const {sendMessage, ...restProps} = props;

  const handleSubmit = (formData: ChatInputFormData) => {
    sendMessage(formData.message);
  };

  return <WrappedComponent onSubmit={handleSubmit} {...restProps} />;
};

export default compose<ComponentType>(
  connect(null, {
    sendMessage: chatOperations.sendMessage,
  }),
  ChatInputContainer,
  reduxForm<ChatInputFormData>({form: 'chat-input', onSubmitSuccess: (result, dispatch) => {dispatch(reset('chat-input'));}}),
)(ChatInput);

