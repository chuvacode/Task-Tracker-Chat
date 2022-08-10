import React, {FC} from 'react';
import {connect} from 'react-redux';
import ChatWindow from './ChatWindow';

import {RouteComponentProps, withRouter} from 'react-router-dom';
import {RootState} from '../../../state/store';
import {Dialog, Profile} from '../../../state/chat/models';
import {chatSelectors} from '../../../state/chat';
import {authSelectors} from '../../../state/auth';

type MapStateToProps = {
  dialog: Dialog
  profiles: Array<Profile>
  currentProfileID: number | null
  isLoadingChatIDs: Array<number>
}

const ChatWindowContainer: FC<MapStateToProps & RouteComponentProps> = props => <ChatWindow {...props} />;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    dialog: chatSelectors.getCurrentChat(state),
    profiles: chatSelectors.getProfiles(state),
    currentProfileID: authSelectors.getProfileID(state),
    isLoadingChatIDs: chatSelectors.getIsLoadingChatIDs(state),
  };
};

export default connect(mapStateToProps)(withRouter(ChatWindowContainer));
