import * as types from './types';
import {IProfile} from './models';
import {InferActionType} from '../store';

const actions = {
    setProfile: (profile: IProfile) => ({
        type: types.SET_PROFILE,
        payload: {
            profile,
        },
    } as const),
    removeProfile: () => ({
        type: types.REMOVE_PROFILE,
    } as const),
    setIsInitialized: (status: boolean) => ({
        type: types.SET_IS_INITIALIZED,
        payload: {
            status,
        },
    } as const),
    setToken: (token: string) => ({
        type: types.SET_TOKEN,
        payload: {
            token,
        },
    } as const),
};

export type ActionTypes = InferActionType<typeof actions>;
export default {
    ...actions,
};
