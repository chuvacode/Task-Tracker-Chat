import React, {ComponentType, FC} from 'react';
import Chat from './Chat';
import {compose} from 'redux';

const ChatContainer: FC = () => <Chat/>;

export default compose<ComponentType>(
)(ChatContainer);

