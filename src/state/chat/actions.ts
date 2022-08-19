import * as types from './types';
import {Dialog, Message, Profile} from './models';
import {InferActionType} from '../store';
import {ChatTab} from './reducers';

const actions = {
    insertMessage: (chat_id: number, owner_id: number, message_id: number, timeSend: string, message: string) => ({
        type: types.INSERT_MESSAGE,
        payload: {
            chat_id,
            owner_id,
            message_id,
            timeSend,
            message,
        },
    } as const),
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
    setActiveTab: (tab: ChatTab) => ({
        type: types.SET_ACTIVE_TAB,
        payload: {
            tab: tab,
        },
    } as const),
    receivedMessageEvent: (chat_id: number, message_id: number, event: MessageEvent) => ({
        type: types.RECEIVED_MESSAGE_EVENT,
        payload: {
            chat_id,
            message_id,
            event,
        },
    } as const),
};

type MessageEvent = {
    id: number
    message_id: number
    user_id: number
    type: string
    created_at: string
    updated_at: string
}

export type ActionTypes = InferActionType<typeof actions>;

export default {
    ...actions,
};

