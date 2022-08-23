import {RootState} from '../store';

const selectors = {
    getAuthStatus: (state: RootState) => {
        return state.profile.isAuth;
    },
    getInitializeStatus: (state: RootState) => {
        return state.profile.isInitialized;
    },
    getProfileFullName: (state: RootState) => {
        return `${state.profile.profile.first_name} ${state.profile.profile.last_name}`;
    },
    getProfileFirstName: (state: RootState) => {
        return state.profile.profile.first_name;
    },
    getProfileLastName: (state: RootState) => {
        return state.profile.profile.last_name;
    },
    getProfileUsername: (state: RootState) => {
        return state.profile.profile.username;
    },
    getProfileImage: (state: RootState) => {
        return state.profile.profile.avatar_url;
    },
    getProfileID: (state: RootState) => {
        return state.profile.profile.id;
    },
    getProfile: (state: RootState) => {
        return state.profile.profile;
    },
    getToken: (state: RootState) => {
        return state.profile.token;
    },
};

export default {
    ...selectors,
};
