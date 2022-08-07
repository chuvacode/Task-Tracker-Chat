import * as types from './types';
import {Profile} from './models';

const setProfile = (profile: Profile) => ({
    type: types.SET_PROFILE,
    ...profile,
});
const removeProfile = () => ({
    type: types.REMOVE_PROFILE,
});
const setIsInitialized = (status: boolean) => ({
    type: types.SET_IS_INITIALIZED,
    status,
});

export {
    setProfile,
    removeProfile,
    setIsInitialized,
};
