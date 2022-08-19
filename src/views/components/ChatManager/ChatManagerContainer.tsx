import ChatManager from './ChatManager';
import React, {ComponentType, FC} from 'react';
import {compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

type Props = RouteComponentProps<{id?: string | undefined}>;

const ChatManagerContainer: FC<Props> = (props) => <ChatManager {...props} />;

export default compose<ComponentType>(
  withRouter,
)(ChatManagerContainer);
