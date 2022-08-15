import * as types from './types';
import {Profile} from './models';
import {ActionTypes} from './actions';

const initialState = {
    isInitialized: false,
    isAuth: false,
    token: null as string | null,
    profile: {
        id: null,
        name: null,
        image: null,
        email: null,
        username: null,
    } as Profile,
};

export type InitialStateType = typeof initialState;

// Reducer
const reducers = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case types.SET_PROFILE:
            return {
                ...state,
                isAuth: true,
                profile: {...action.payload.profile},
            };
        case types.REMOVE_PROFILE:
            return {
                ...state,
                isAuth: false,
                profile: {
                    id: null,
                    name: null,
                    image: null,
                    email: null,
                    username: null,
                },
            };
        case types.SET_IS_INITIALIZED:
            return {
                ...state,
                isInitialized: action.payload.status,
            };
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            };
        default:
            return state;
    }
};

export default reducers;
