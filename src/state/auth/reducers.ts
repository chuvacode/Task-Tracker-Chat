import * as api from '../../api/index';
import {setProfile} from './actions';
import {REMOVE_PROFILE, SET_IS_INITIALIZED, SET_PROFILE} from './types';

export type InitialStateType = {
    isInitialized: boolean
    isAuth: boolean
    profileId: number | null
    profileName: string | null
    profileImage: string | null
    profileEmail: string | null
    profileUsername: string | null
}

const initialState: InitialStateType = {
    isInitialized: false,
    isAuth: false,
    profileId: null,
    profileName: null,
    profileImage: null,
    profileEmail: null,
    profileUsername: null,
};

// Types
type Profile = {
    profileId: number,
    profileName: string,
    profileImage: string,
    profileEmail: string,
    profileUsername: string,
}

// Reducer
const reducers = (state = initialState, action: any): InitialStateType => {
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
                isInitialized: action.status,
            };
        default:
            return state;
    }
};

export default reducers;
