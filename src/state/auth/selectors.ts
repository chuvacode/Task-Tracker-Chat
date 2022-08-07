import {RootState} from '../store';

export const getAuthStatus = (state: RootState): boolean => {
  return state.profile.isAuth;
};

export const getInitializeStatus = (state: RootState): boolean => {
  return state.profile.isInitialized;
};
