import * as types from './types';
import {Profile} from './models';

export const addNewMessage = (message_id: number, message: string) => {
    return {
        type: types.ADD_NEW_MESSAGE,
        message,
        message_id,
    };
};
export const setDialogs = (dialogs: Array<any>) => {
    return {
        type: types.SET_DIALOGS,
        dialogs: dialogs,
    };
};
export const setMessages = (chat_id: number, messages: string) => {
    return {
        type: types.SET_MESSAGES,
        chat_id: chat_id,
        messages: messages,
    };
};
export const addProfiles = (profiles: Array<Profile>) => {
    return {
        type: types.ADD_PROFILES,
        profiles: profiles,
    };
};
export const setActiveDialog = (dialog_id: number) => {
    return {
        type: types.SET_ACTIVE_DIALOG,
        dialog_id,
    };
};
export const setStatusLoadingChat = (chat_id: number, status: boolean) => {
    return {
        type: types.SET_STATUS_LOADING_CHAT,
        status,
        chat_id,
    };
};
export const toggleSelectMessage = (message_id: number) => {
    return {
        type: types.TOGGLE_SELECT_MESSAGE,
        message_id,
    };
};
export const allUnselect = () => {
    return {
        type: types.ALL_UNSELECT,
    };
};
