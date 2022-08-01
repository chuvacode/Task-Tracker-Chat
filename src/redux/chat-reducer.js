import axios from 'axios';
import {useDispatch} from 'react-redux';
import * as api from '../api'

let initialState = {
  dialogs: [],
  profiles: [],
  activeTab: "group",
  currentDialogID: null,
  textNewMessage: "",
  countNewMessages: 1,
  isLoadingChatIds: []
};

let UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';
let ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
let SET_ACTIVE_DIALOG = 'SET_ACTIVE_DIALOG';
let SET_DIALOGS = 'SET_DIALOGS';
let SET_MESSAGES = 'SET_MESSAGES';
let ADD_PROFILES = 'ADD_PROFILES';
let SET_STATUS_LOADING_CHAT = 'SET_STATUS_LOADING_CHAT';

let ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT_NEW_MESSAGE:
      return {
        ...state,
        textNewMessage: action.text
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (state.currentDialogID === dialog.id) {
            return {
              ...dialog,
              messages: [
                ...dialog.messages,
                {
                  id: dialog.messages.length + 1,
                  owner_id: 1,
                  messageText: state.textNewMessage,
                  timeSending: formatterTime(new Date())
                }
              ]
            }
          }
          return dialog;
        }),
        textNewMessage: ""
      };
    case SET_ACTIVE_DIALOG:
      return {
        ...state,
        currentDialogID: action.dialog_id
      };
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.dialogs
      };
    case SET_MESSAGES:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (dialog.id === action.chat_id) {
            return {
              ...dialog,
              messages: action.messages
            }
          }
          return dialog;
        })
      };
    case ADD_PROFILES:
      return {
        ...state,
        profiles: [
          ...state.profiles,
          ...action.profiles
        ]
      };
    case SET_STATUS_LOADING_CHAT:
      return {
        ...state,
        isLoadingChatIds: action.status
          ? [...state.isLoadingChatIds, action.chat_id]
          : state.isLoadingChatIds.filter(id => id !== action.chat_id)
      };
    default:
      return state;
  }
};

// Action Creators
export let updateTextNewMessage = (text) => {
  return {
    type: UPDATE_TEXT_NEW_MESSAGE,
    text: text
  }
};
export let addNewMessage = () => {
  return {
    type: ADD_NEW_MESSAGE
  }
};
export let setDialogs = (dialogs) => {
  return {
    type: SET_DIALOGS,
    dialogs: dialogs
  }
};
export let setMessages = (chat_id, messages) => {
  return {
    type: SET_MESSAGES,
    chat_id: chat_id,
    messages: messages
  }
};
export let addProfiles = (profiles) => {
  return {
    type: ADD_PROFILES,
    profiles: profiles
  }
};
export let setActiveDialog = (dialog_id) => {
  return {
    type: SET_ACTIVE_DIALOG,
    dialog_id
  }
};
export let setStatusLoadingChat = (chat_id, status) => {
  return {
    type: SET_STATUS_LOADING_CHAT,
    status,
    chat_id
  }
};

// Helpers
export let formatterTime = (date_time) => {
  let h = (date_time.getHours() > 10 ? date_time.getHours() : "0" + date_time.getHours());
  let m = (date_time.getMinutes() > 10 ? date_time.getMinutes() : "0" + date_time.getMinutes());
  return h + ":" + m;
};

// Thunks
export const getChats = () => {
  return dispatch => {
    api.Chat.getChats()
      .then(chats => {
        dispatch(setDialogs(chats.items.map(dialog => {
          return {
            id: dialog.id,
            type: dialog.type,
            name: dialog.meta.name,
            description: dialog.meta.description,
            image: dialog.meta.image_url,
            messages: []
          }
        })));
      });
  };
};
export const activeDialog = chat_id => {
  return (dispatch, state) => {
    dispatch(setStatusLoadingChat(chat_id, true));
    dispatch(setActiveDialog(chat_id));
    api.Chat.getMessages(chat_id)
      .then(messages => {
        // Set Messages
        dispatch(setMessages(chat_id, messages.items.map(message => {
          return {
            id: message.id,
            messageText: message.message,
            timeSending: formatterTime(new Date(message.timestamp_sent)),
            owner_id: message.owner_id,
          };
        })));

        // Chat User IDs
        let user_ids = messages.items.reduce((result, message) => {
          return result.includes(message.owner_id) ? result : [...result, message.owner_id];
        }, []);

        // Missing User IDs
        user_ids = user_ids.filter(id => !(state().chat.profiles.some(profile => profile.id === id)));

        if (user_ids.length === 0) {
          return dispatch(setStatusLoadingChat(chat_id, false));
        }

        // Get Profiles
        api.User.getProfiles(user_ids)
          .then(profiles => {
            dispatch(addProfiles(profiles.items.map(profile => {
              return {
                id: profile.id,
                name: `${profile.first_name}  ${profile.last_name}`,
                image: profile.avatar_url
              };
            })));
            dispatch(setStatusLoadingChat(chat_id, false));
          });
      });
  };
};
export const sendMessage = () => {
  return (dispatch, state) => {
    state = state().chat;
    if (state.textNewMessage.trim() === "") return;
    api.Chat.sendMessage(state.currentDialogID, state.textNewMessage, Date.now());
    dispatch(addNewMessage());
  }
};

export default ChatReducer;
