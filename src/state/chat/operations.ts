import * as api from '../../api';
import actions from './actions';
import {Dialog, Message, Profile} from './models';
import {formatterTime} from '../../utils';
import {ThunkActionType} from '../store';
import Echo from 'laravel-echo';
import axios from 'axios';

const operations = {
  getChats: (): ThunkActionType => async (dispatch, state) => {
    const authState = state().profile;
    const chatState = state().chat;

    const chats = await api.Chat.getChats();
    const chats_: Dialog[] = chats.items.map((dialog: any): Dialog => {
      return {
        id: dialog.id,
        type: dialog.type,
        name: dialog.meta.name,
        description: dialog.meta.description,
        image: dialog.meta.image_url,
        messages: null,
      };
    });
    await dispatch(actions.setDialogs(chats_));

    // @ts-ignore
    if (window.Pusher === undefined) {
      // @ts-ignore
      window.Pusher = require('pusher-js');
      // @ts-ignore
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '1',
        wsHost: '127.0.0.1',
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        cluster: 'mt1',
        authorizer: (channel: any, options: any) => {
          return {
            authorize: (socketId: any, callback: any) => {
              axios({
                method: 'POST',
                url: 'http://localhost:8000/api/broadcasting/auth',
                headers: {
                  Authorization: `Bearer ${authState.token}`,
                },
                data: {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
              })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
      });

      chats_.forEach(chat => {
        // @ts-ignore
        window.Echo.private(`chat.${chat.id}`)
          .listen('.new-message-event', (e: any) => {
            dispatch(actions.insertMessage(e.message.chat_id, e.message.owner_id, e.message.id, e.message.timestamp_sent, e.message.message));
          });
      });
    }

    // @ts-ignore
    // window.Echo.private(`chat.${chat_id}`)
    //   .listenForWhisper('new-message-event', (e: any) => {
    //     console.log(e);
    //   });
  },
  activeDialog: (chat_id: number): ThunkActionType => async (dispatch, state) => {
    const chatState = state().chat;

    window.history.pushState(null, '', `/chat/${chat_id}`);

    if (chatState.dialogs.length === 0) return;

    if (chatState.currentDialogID === chat_id) {
      const currentDialog = chatState.dialogs.find(chat => chat.id === chat_id);
      if (currentDialog && currentDialog.messages !== null) {
        return;
      }
    }

    dispatch(actions.allUnselect());
    dispatch(actions.setStatusLoadingChat(chat_id, true));
    await dispatch(actions.setActiveDialog(chat_id));

    api.Chat.getMessages(chat_id)
      .then(messages => {
        // Set Messages
        dispatch(actions.setMessages(chat_id, messages.items.map((message: any) => {
          return {
            id: message.id,
            messageText: message.message,
            timeSending: formatterTime(new Date(message.timestamp_sent)),
            owner_id: message.owner_id,
          };
        })));

        // Chat User IDs
        let user_ids = messages.items.reduce((result: Array<number>, message: Message) => {
          return result.includes(message.owner_id) ? result : [...result, message.owner_id];
        }, []);

        // Missing User IDs
        user_ids = user_ids.filter((id: number) =>
          !(state().chat.profiles.some((profile: Profile) => profile.id === id)));

        if (user_ids.length === 0) {
          return dispatch(actions.setStatusLoadingChat(chat_id, false));
        }

        // Get Profiles
        api.User.getProfiles(user_ids)
          .then(profiles => {
            dispatch(actions.addProfiles(profiles.items.map((profile: any): Profile => {
              return {
                id: profile.id,
                name: `${profile.first_name}  ${profile.last_name}`,
                image: profile.avatar_url,
              };
            })));
            dispatch(actions.setStatusLoadingChat(chat_id, false));
          });
      });

  },
  sendMessage: (message: string): ThunkActionType => (dispatch, state) => {
    const chatState = state().chat;
    if (!message || message.trim() === '') return;
    if (!chatState.currentDialogID) return;
    api.Chat.sendMessage(chatState.currentDialogID, message, Date.now());
  },
  deleteMessages: (): ThunkActionType => (dispatch, state) => {
    const chatState = state().chat;
    const message_ids = chatState.selectedMessageIds;

    api.Chat.deleteMessages(message_ids).then(status => {
      if (!chatState.currentDialogID) return;
      dispatch(actions.allUnselect());
      dispatch(actions.setStatusLoadingChat(chatState.currentDialogID, true));
      dispatch(actions.setActiveDialog(chatState.currentDialogID));
      api.Chat.getMessages(chatState.currentDialogID)
        .then(messages => {
          if (!chatState.currentDialogID) return;

          // Set Messages
          dispatch(actions.setMessages(chatState.currentDialogID, messages.items.map((message: any) => {
            return {
              id: message.id,
              messageText: message.message,
              timeSending: formatterTime(new Date(message.timestamp_sent)),
              owner_id: message.owner_id,
            };
          })));

          // Chat User IDs
          let user_ids = messages.items.reduce((result: Array<number>, message: any) => {
            return result.includes(message.owner_id) ? result : [...result, message.owner_id];
          }, []);

          // Missing User IDs
          user_ids = user_ids.filter((id: number) =>
            !(chatState.profiles.some((profile: Profile) => profile.id === id)));

          if (user_ids.length === 0) {
            return dispatch(actions.setStatusLoadingChat(chatState.currentDialogID, false));
          }

          // Get Profiles
          api.User.getProfiles(user_ids)
            .then(profiles => {
              if (!chatState.currentDialogID) return;
              dispatch(actions.addProfiles(profiles.items.map((profile: any) => {
                return {
                  id: profile.id,
                  name: `${profile.first_name}  ${profile.last_name}`,
                  image: profile.avatar_url,
                };
              })));
              dispatch(actions.setStatusLoadingChat(chatState.currentDialogID, false));
            });
        });
    });

  },
};

operations.activeDialog(1);

export default {
  ...operations,
};
