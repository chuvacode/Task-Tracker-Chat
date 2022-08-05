import * as api from '../api'
import {removeProfile} from "./auth-reducer";

let initialState = {
  dialogs: [],
  profiles: [],
  activeTab: "group",
  currentDialogID: null,
  countNewMessages: 1,
  isLoadingChatIds: [],
  selectedMessageIds: []
};

let ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
let SET_DIALOGS = 'SET_DIALOGS';
let SET_MESSAGES = 'SET_MESSAGES';
let ADD_PROFILES = 'ADD_PROFILES';
let SET_ACTIVE_DIALOG = 'SET_ACTIVE_DIALOG';
let SET_STATUS_LOADING_CHAT = 'SET_STATUS_LOADING_CHAT';
let TOGGLE_SELECT_MESSAGE = 'TOGGLE_SELECT_MESSAGE';
let ALL_UNSELECT = 'ALL_UNSELECT';

// Action Creators
export const addNewMessage = (message_id, message) => {
  return {
    type: ADD_NEW_MESSAGE,
    message,
    message_id
  }
};
export const setDialogs = dialogs => {
  return {
    type: SET_DIALOGS,
    dialogs: dialogs
  }
};
export const setMessages = (chat_id, messages) => {
  return {
    type: SET_MESSAGES,
    chat_id: chat_id,
    messages: messages
  }
};
export const addProfiles = profiles => {
  return {
    type: ADD_PROFILES,
    profiles: profiles
  }
};
export const setActiveDialog = dialog_id => {
  return {
    type: SET_ACTIVE_DIALOG,
    dialog_id
  }
};
export const setStatusLoadingChat = (chat_id, status) => {
  return {
    type: SET_STATUS_LOADING_CHAT,
    status,
    chat_id
  }
};
export const toggleSelectMessage = message_id => {
  return {
    type: TOGGLE_SELECT_MESSAGE,
    message_id
  }
};
export const allUnselect = () => {
  return {
    type: ALL_UNSELECT
  }
};

// Helpers
export const formatterTime = (date_time) => {
  let h = (date_time.getHours() > 10 ? date_time.getHours() : "0" + date_time.getHours());
  let m = (date_time.getMinutes() > 10 ? date_time.getMinutes() : "0" + date_time.getMinutes());
  return h + ":" + m;
};

// Thunks
export const getChats = () => dispatch => {
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
    })
    .catch(response => {
      if (response.status === 401) {
        dispatch(removeProfile());
      }
    });
};
export const activeDialog = chat_id => (dispatch, state) => {
  // try activate current chat
  if (state().chat.currentDialogID === chat_id) return;
  dispatch(allUnselect());
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
export const sendMessage = message => (dispatch, state) => {
  state = state().chat;
  if (!message || message.trim() === "") return;
  api.Chat.sendMessage(state.currentDialogID, message, Date.now())
    .then(message => {
      dispatch(addNewMessage(message.id, message.message));
    });
};
export const deleteMessages = () => (dispatch, state) => {
  state = state().chat;
  const message_ids = state.selectedMessageIds;

  api.Chat.deleteMessages(message_ids).then(status => {
    dispatch(allUnselect());
    dispatch(setStatusLoadingChat(state.currentDialogID, true));
    dispatch(setActiveDialog(state.currentDialogID));
    api.Chat.getMessages(state.currentDialogID)
      .then(messages => {
        // Set Messages
        dispatch(setMessages(state.currentDialogID, messages.items.map(message => {
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
        user_ids = user_ids.filter(id => !(state.profiles.some(profile => profile.id === id)));

        if (user_ids.length === 0) {
          return dispatch(setStatusLoadingChat(state.currentDialogID, false));
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
            dispatch(setStatusLoadingChat(state.currentDialogID, false));
          });
      });
  });

};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
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
                  id: action.message_id,
                  owner_id: 1,
                  messageText: action.message,
                  timeSending: formatterTime(new Date())
                }
              ]
            }
          }
          return dialog;
        })
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
    case TOGGLE_SELECT_MESSAGE:
      return {
        ...state,
        selectedMessageIds: !state.selectedMessageIds.some(id => action.message_id === id) ?
          [...state.selectedMessageIds, action.message_id] :
          state.selectedMessageIds.filter(id => action.message_id !== id)
      };
    case ALL_UNSELECT:
      return {
        ...state,
        selectedMessageIds: []
      };
    default:
      return state;
  }
};
