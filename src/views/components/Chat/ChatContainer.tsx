import React, {FC} from 'react';
import {connect} from 'react-redux';
import Chat from './Chat';

const ChatContainer: FC = () => <Chat/>;

export default connect()(ChatContainer);

