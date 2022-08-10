import {RootState} from '../store';

const selectors = {
    getAuthStatus: (state: RootState) => {
        return state.profile.isAuth;
    },
    getInitializeStatus: (state: RootState) => {
        return state.profile.isInitialized;
    },
    getProfileName: (state: RootState) => {
        return state.profile.profile.name;
    },
    getProfileImage: (state: RootState) => {
        return state.profile.profile.image;
    },
    getProfileID: (state: RootState) => {
        return state.profile.profile.id;
    },
};

export default {
    ...selectors,
};
