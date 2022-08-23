import {bindActionCreators} from 'redux';
import {chatActions, chatOperations} from '../state/chat';
import {authActions, authOperations} from '../state/auth';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../state/store';

const actionCreators = {
  ...chatActions,
  ...chatOperations,
  ...authActions,
  ...authOperations,
};

export const useActions = () => {
  const dispatch: AppDispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
