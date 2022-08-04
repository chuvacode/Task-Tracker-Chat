import * as api from "../api";

let initialState = {
  isInitialized: false,
  isAuth: false,
  profileId: null,
  profileName: null,
  profileImage: null,
  profileEmail: null,
  profileUsername: null,
};

const SET_PROFILE = 'SET_PROFILE';
const REMOVE_PROFILE = 'REMOVE_PROFILE';
const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED';

// Action Creators
export const setProfile = (profileId, profileName, profileImage, profileEmail, profileUsername) => ({
  type: SET_PROFILE,
  profileId,
  profileName,
  profileImage,
  profileEmail,
  profileUsername,
});
export const removeProfile = () => ({
  type: REMOVE_PROFILE
});
export const setIsInitialized = status => ({
  type: SET_IS_INITIALIZED,
  status
});

// Thunks
export const getMeProfile = () => dispatch => {
  api.Auth.getMe()
    .then(profile => {
      dispatch(setProfile(
        profile.id,
        `${profile.first_name} ${profile.last_name}`,
        profile.avatar_url,
        profile.email,
        profile.username,
      ));
    })
    .catch(response => {
      if (response.status === 401) {
        dispatch(removeProfile());
      }
    })
    .finally(() => {
      dispatch(setIsInitialized(true));
    });
};
export const login = (login, password) => dispatch => {
  api.Auth.getCookie().then(() => {
    api.Auth.login(login, password)
      .then(profile => {
        dispatch(setProfile(
          profile.id,
          `${profile.first_name} ${profile.last_name}`,
          profile.avatar_url,
          profile.email,
          profile.username,
        ));
      });
  });
};
export const logout = () => dispatch => {
  api.Auth.logout()
    .then(response => {
      dispatch(removeProfile());
    });
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        isAuth: true,
        profileId: action.profileId,
        profileName: action.profileName,
        profileImage: action.profileImage,
        profileEmail: action.profileEmail,
        profileUsername: action.profileUsername,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        isAuth: false,
        profileId: null,
        profileName: null,
        profileImage: null,
        profileEmail: null,
        profileUsername: null,
      };
    case SET_IS_INITIALIZED:
      return {
        ...state,
        isInitialized: action.status
      };
    default:
      return state;
  }
};
