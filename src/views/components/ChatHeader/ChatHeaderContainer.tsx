import React, {FC} from 'react';
import ChatHeader from './ChatHeader';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const ChatHeaderContainer: FC = props => <ChatHeader {...props} />;

export default compose(withRouter)
(ChatHeaderContainer) as React.ComponentType;
