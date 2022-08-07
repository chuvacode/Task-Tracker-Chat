import {Dialog, Profile} from './models';
import * as types from './types';
import {formatterTime} from '../../utils';

// InitialState
const initialState = {
    dialogs: [] as Array<Dialog>,
    profiles: [] as Array<Profile>,
    activeTab: 'group' as string,
    currentDialogID: null as number | null,
    countNewMessages: 1 as number,
    isLoadingChatIds: [] as Array<number>,
    selectedMessageIds: [] as Array<number>,
};
export type InitialStateType = typeof initialState;

// Reducer
export default (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
      case types.ADD_NEW_MESSAGE:
            return {
                ...state,
                dialogs: state.dialogs.map((dialog: Dialog): Dialog => {
                    if (state.currentDialogID === dialog.id) {
                        return {
                            ...dialog,
                            messages: [
                                ...dialog.messages,
                                {
                                    id: action.message_id,
                                    owner_id: 1,
                                    messageText: action.message,
                                    timeSending: formatterTime(new Date()),
                                },
                            ],
                        };
                    }
                    return dialog;
                }),
            };
        case types.SET_ACTIVE_DIALOG:
            return {
                ...state,
                currentDialogID: action.dialog_id,
            };
        case types.SET_DIALOGS:
            return {
                ...state,
                dialogs: action.dialogs,
            };
        case types.SET_MESSAGES:
            return {
                ...state,
                dialogs: state.dialogs.map(dialog => {
                    if (dialog.id === action.chat_id) {
                        return {
                            ...dialog,
                            messages: action.messages,
                        };
                    }
                    return dialog;
                }),
            };
        case types.ADD_PROFILES:
            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    ...action.profiles,
                ],
            };
        case types.SET_STATUS_LOADING_CHAT:
            return {
                ...state,
                isLoadingChatIds: action.status
                    ? [...state.isLoadingChatIds, action.chat_id]
                    : state.isLoadingChatIds.filter(id => id !== action.chat_id),
            };
        case types.TOGGLE_SELECT_MESSAGE:
            return {
                ...state,
                selectedMessageIds: !state.selectedMessageIds.some(id => action.message_id === id) ?
                    [...state.selectedMessageIds, action.message_id] :
                    state.selectedMessageIds.filter(id => action.message_id !== id),
            };
        case types.ALL_UNSELECT:
            return {
                ...state,
                selectedMessageIds: [],
            };
        default:
            return state;
    }
};
