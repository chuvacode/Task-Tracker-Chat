import {Dialog, Profile} from './models';
import * as types from './types';
import {formatterTime} from '../../utils';
import {ActionTypes} from './actions';

export type ChatTab = 'group' | 'contact';

// InitialState
const initialState = {
  dialogs: [] as Array<Dialog>,
  profiles: [] as Array<Profile>,
  activeTab: 'group' as ChatTab,
  currentDialogID: null as number | null,
  countUnread: 0,
  isLoadingChatIds: [] as Array<number>,
  selectedMessageIds: [] as Array<number>,
};
export type InitialState = typeof initialState;

const reducers = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case types.INSERT_MESSAGE:
      // if (action.payload.chat_id !== state.currentDialogID) return state;
      return {
        ...state,
        dialogs: state.dialogs.map((dialog: Dialog): Dialog => {
          if (dialog.messages && dialog.id === action.payload.chat_id) {
            return {
              ...dialog,
              messages: [
                ...dialog.messages,
                {
                  id: action.payload.message_id,
                  owner_id: action.payload.owner_id,
                  message: action.payload.message,
                  timeSending: formatterTime(new Date(action.payload.timeSend)),
                  events: [],
                },
              ],
            };
          }
          return dialog;
        }),
      };
    case types.ADD_NEW_MESSAGE:
      return {
        ...state,
        dialogs: state.dialogs.map((dialog: Dialog): Dialog => {
          if (dialog.messages && state.currentDialogID === dialog.id) {
            return {
              ...dialog,
              messages: [
                ...dialog.messages,
                {
                  id: action.payload.message_id,
                  owner_id: 1,
                  message: action.payload.message,
                  timeSending: formatterTime(new Date()),
                  events: [],
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
        dialogs: action.payload.dialogs,
      };
    case types.SET_MESSAGES:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (dialog.id === action.payload.chat_id) {
            return {
              ...dialog,
              messages: action.payload.messages,
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
    case types.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload.tab,
      };
    case types.RECEIVED_MESSAGE_EVENT:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (dialog.id === action.payload.chat_id && dialog.messages) {
            return {
              ...dialog,
              messages: dialog.messages.map(message => {
                if (message.id === action.payload.message_id) {
                  return {
                    ...message,
                    events: [...message.events, action.payload.event],
                  };
                }
                return message;
              }),
            };
          }
          return dialog;
        }),
      };
    case types.DELETED_MESSAGE_EVENT:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (dialog.id === action.payload.chat_id && dialog.messages) {
            return {
              ...dialog,
              messages: dialog.messages.filter(message => message.id !== action.payload.message_id),
            };
          }
          return dialog;
        }),
      };
    case types.SET_COUNT_UNREAD:
      return {
        ...state,
        countUnread: action.payload.countUnread,
      };
    default:
      return state;
  }
};

// Reducer
export default reducers;
