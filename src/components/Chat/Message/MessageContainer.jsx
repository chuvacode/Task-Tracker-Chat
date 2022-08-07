import React from 'react';
import {connect} from 'react-redux';
import Message from './Message';
import {deleteMessages} from '../../../state/chat/operations';
import {toggleSelectMessage} from '../../../state/chat/actions';

class MessageContainer extends React.Component {
  render() {
    return <Message {...this.props} />;
  }
}

const mapStateToProps = state => ({
  selectedMessageIds: state.chat.selectedMessageIds,
});

export default connect(mapStateToProps, {
  deleteMessages,
  toggleSelectMessage,
})(MessageContainer);

