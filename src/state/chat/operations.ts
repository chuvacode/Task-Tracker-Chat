import * as api from '../../api';
import actions from './actions';
import {Dialog, Message, Profile} from './models';
import {formatterTime} from '../../utils';
import {ThunkActionType} from '../store';
import {MessageEventSubscriber, NewMessageEventSubscriber} from '../../api/chat';

const operations = {
  getChats: (): ThunkActionType => async (dispatch, getState) => {
    const chatState = getState().chat;
    const profileState = getState().profile;
    const chats = await api.Chat.getChats();
    const chats_: Dialog[] = chats.items.map((dialog: any): Dialog => {
      return {
        id: dialog.id,
        type: dialog.type,
        name: dialog.meta.name,
        description: dialog.meta.description,
        image: dialog.meta.image_url,
        count_unread: dialog.meta.count_unread,
        messages: dialog.messages.map((message: any) => {
          return {
            id: message.id,
            message: message.message,
            timeSending: formatterTime(new Date(message.timestamp_sent)),
            owner_id: message.owner_id,
            events: message.events,
          };
        }),
      };
    });

    await dispatch(actions.setDialogs(chats_));

    chats_.forEach(chat => {
      const callback: NewMessageEventSubscriber = (...args) => {
        if (chat.id === args[0]) {
          dispatch(actions.insertMessage(...args));
          dispatch(operations.markReadMessage(args[0], [args[2]]));
        }
      };

      api.Chat.subscribeMessageReceive(chat.id, callback);
    });

    const handlerWasReadMessageEvent:MessageEventSubscriber = (...args) => {
      dispatch(actions.receivedMessageEvent(...args));
    };

    api.Chat.subscribeWasReadMessageEvent(handlerWasReadMessageEvent);
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
        const unread: Array<number> = [];

        // Set Messages
        dispatch(actions.setMessages(chat_id, messages.items.map((message: any) => {
          if (message.events.length === 0 || !message.events.some((event: any) => event.type === 'read')) {
            unread.push(message.id);
          }
          return {
            id: message.id,
            message: message.message,
            timeSending: formatterTime(new Date(message.timestamp_sent)),
            owner_id: message.owner_id,
            events: message.events,
          };
        })));

        // Push event read
        dispatch(operations.markReadMessage(chat_id, unread));
        // api.Chat.markRead(unread);

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
  markReadMessage: (chat_id: number, message_ids: Array<number>): ThunkActionType => (dispatch, getState) => {
    if (getState().chat.currentDialogID === chat_id) {
      // Fake read event
      message_ids.forEach(message_id => {
        dispatch(actions.receivedMessageEvent(chat_id, message_id, {
          message_id,
          user_id: getState().profile.profile.id || -1,
          id: 0,
          type: 'read',
          created_at: '',
          updated_at: '',
        }));
      });

      // Push event read
      api.Chat.markRead(message_ids);
    }
  },
};

export default {
  ...operations,
};
