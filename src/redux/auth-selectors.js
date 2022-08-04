export const getAuthStatus = state => {
  return state.profile.isAuth;
};

export const getInitializeStatus = state => {
  return state.profile.isInitialized;
};
