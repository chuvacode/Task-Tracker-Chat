import * as api from "../api";

let initialState = {
  profileId: null,
  profileName: null,
  profileImage: null,
  profileEmail: null,
  profileUsername: null,
};

const SET_PROFILE = 'SET_PROFILE';

let ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profileId: action.profileId,
        profileName: action.profileName,
        profileImage: action.profileImage,
        profileEmail: action.profileEmail,
        profileUsername: action.profileUsername,
      };
    default:
      return state;
  }
};

// Action Creators
export const setProfile = (profileId, profileName, profileImage, profileEmail, profileUsername) => {
  return {
    type: 'SET_PROFILE',
    profileId,
    profileName,
    profileImage,
    profileEmail,
    profileUsername,
  };
};

// Thunks
export const getMeProfile = () => {
  return dispatch => {
    api.Auth.getMe()
      .then(profile => {
        dispatch(setProfile(
          profile.id,
          `${profile.first_name} ${profile.last_name}`,
          profile.avatar_url,
          profile.email,
          profile.username,
        ));
      });
  };
};



export default ProfileReducer;
