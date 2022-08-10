import * as types from './types';
import {Dialog, Message, Profile} from './models';
import {InferActionType} from '../store';

const actions = {
    addNewMessage: (message_id: number, message: string) => ({
        type: types.ADD_NEW_MESSAGE,
        payload: {
            message,
            message_id,
        },
    } as const),
    setDialogs: (dialogs: Array<Dialog>) => ({
        type: types.SET_DIALOGS,
        payload: {
            dialogs: dialogs,
        },
    } as const),
    setMessages: (chat_id: number, messages: Array<Message>) => ({
        type: types.SET_MESSAGES,
        payload: {
            chat_id: chat_id,
            messages: messages,
        },
    } as const),
    addProfiles: (profiles: Array<Profile>) => ({
        type: types.ADD_PROFILES,
        profiles: profiles,
    } as const),
    setActiveDialog: (dialog_id: number) => ({
        type: types.SET_ACTIVE_DIALOG,
        dialog_id,
    } as const),
    setStatusLoadingChat: (chat_id: number, status: boolean) => ({
        type: types.SET_STATUS_LOADING_CHAT,
        status,
        chat_id,
    } as const),
    toggleSelectMessage: (message_id: number) => ({
        type: types.TOGGLE_SELECT_MESSAGE,
        message_id,
    } as const),
    allUnselect: () => ({
        type: types.ALL_UNSELECT,
    } as const),
};

export type ActionTypes = InferActionType<typeof actions>;

export default {
    ...actions,
};

