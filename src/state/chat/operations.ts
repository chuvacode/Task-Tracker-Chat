import actions from './actions';
import {Dialog, Message, Profile} from './models';
import {formatterTime} from '../../utils';
import {ThunkActionType} from '../store';
import {ChatService, MessageEventSubscriber, NewMessageEventSubscriber} from '../../api/ChatService';
import {chatActions, chatSelectors} from './index';
import {authSelectors} from '../auth';

const operations = {
  getChats: (): ThunkActionType => async (dispatch, getState) => {
    const chatState = getState().chat;
    const profileState = getState().profile;
    const chats = await ChatService.getChats();
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

    chats.items.forEach((chat: any) => {
      dispatch(actions.setStatusLoadingChat(chat.id, true));
      dispatch(actions.addProfiles(chat.members.map((profile: any): Profile => {
        return {
          id: profile.id,
          name: `${profile.first_name}  ${profile.last_name}`,
          image: profile.avatar_url,
        };
      })));
      dispatch(actions.setStatusLoadingChat(chat.id, false));
    });

    await dispatch(actions.setDialogs(chats_));

    // Subscribe on receiving messages
    chats_.forEach(chat => {
      const callback: NewMessageEventSubscriber = (...args) => {
        if (chat.id === args[0]) {
          dispatch(actions.insertMessage(...args));
          if (args[1] !== profileState.profile.id) {
            dispatch(operations.markReadMessage(args[0], [args[2]]));
          }
        }
      };
      ChatService.subscribeMessageReceive(chat.id, callback);
    });

    // Subscribe on reading messages
    const handlerMessageWasReadEvent:MessageEventSubscriber = (...args) => {
      dispatch(actions.receivedMessageEvent(...args));
    };
    ChatService.subscribeMessageWasReadEvent(handlerMessageWasReadEvent);

    // Subscribe on deleting messages
    const handlerMessageWasDeletedEvent:MessageEventSubscriber = (...args) => {
      const owner_id = args[2];
      const event = args[3];

      if (event.user_id === owner_id || event.user_id === profileState.profile.id) {
        dispatch(actions.deletedMessageEvent(...args));
      }

    };
    ChatService.subscribeMessageWasDeletedEvent(handlerMessageWasDeletedEvent);
  },
  activeDialog: (chat_id: number): ThunkActionType => async (dispatch, getState) => {
    const chatState = getState().chat;
    const profileState = getState().profile;

    // Exit because for some reason there are no chat
    if (chatState.dialogs.length === 0) return;

    // Exit because it current chat
    if (chatState.currentDialogID === chat_id) {
      const currentDialog = chatState.dialogs.find(chat => chat.id === chat_id);
      if (currentDialog && currentDialog.messages !== null) return;
    }

    dispatch(actions.allUnselect());
    dispatch(actions.setStatusLoadingChat(chat_id, true));
    await dispatch(actions.setActiveDialog(chat_id));

    ChatService.getMessages(chat_id)
      .then(messages => {
        const unread: Array<number> = [];

        // Set Messages
        dispatch(actions.setMessages(chat_id, messages.items.map((message: any) => {
          if (message.events.length === 0 || !message.events.some((event: any) => event.type === 'read'
              && event.user_id === profileState.profile.id)) {
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
        if (unread.length > 0) {
          dispatch(operations.markReadMessage(chat_id, unread));
        }

        // Chat User IDs
        let user_ids = messages.items.reduce((result: Array<number>, message: Message) => {
          return result.includes(message.owner_id) ? result : [...result, message.owner_id];
        }, []);

        // Missing User IDs
        user_ids = user_ids.filter((id: number) =>
          !(getState().chat.profiles.some((profile: Profile) => profile.id === id)));

        if (user_ids.length === 0) {
          return dispatch(actions.setStatusLoadingChat(chat_id, false));
        }

        dispatch(actions.setStatusLoadingChat(chat_id, false));

        // Get Profiles
        // api.User.getProfiles(user_ids)
        //   .then(profiles => {
        //     dispatch(actions.addProfiles(profiles.items.map((profile: any): Profile => {
        //       return {
        //         id: profile.id,
        //         name: `${profile.first_name}  ${profile.last_name}`,
        //         image: profile.avatar_url,
        //       };
        //     })));
        //     dispatch(actions.setStatusLoadingChat(chat_id, false));
        //   });
      });

  },
  sendMessage: (message: string): ThunkActionType => (dispatch, state) => {
    const chatState = state().chat;
    if (!message || message.trim() === '') return;
    if (!chatState.currentDialogID) return;
    ChatService.sendMessage(chatState.currentDialogID, message, Date.now());
  },
  deleteMessages: (): ThunkActionType => (dispatch, state) => {
    const chatState = state().chat;
    const message_ids = chatState.selectedMessageIds;

    ChatService.deleteMessages(message_ids).then(status => {
      if (!chatState.currentDialogID) return;
      dispatch(actions.allUnselect());
      dispatch(actions.setStatusLoadingChat(chatState.currentDialogID, true));
      dispatch(actions.setActiveDialog(chatState.currentDialogID));

      ChatService.getMessages(chatState.currentDialogID)
        .then(messages => {
          if (!chatState.currentDialogID) return;

          // Set Messages
          dispatch(actions.setMessages(chatState.currentDialogID, messages.items.map((message: any) => {
            return {
              id: message.id,
              message: message.message,
              timeSending: formatterTime(new Date(message.timestamp_sent)),
              owner_id: message.owner_id,
              events: message.events,
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
          // api.User.getProfiles(user_ids)
          //   .then(profiles => {
          //     if (!chatState.currentDialogID) return;
          //     dispatch(actions.addProfiles(profiles.items.map((profile: any) => {
          //       return {
          //         id: profile.id,
          //         name: `${profile.first_name}  ${profile.last_name}`,
          //         image: profile.avatar_url,
          //       };
          //     })));
          //     dispatch(actions.setStatusLoadingChat(chatState.currentDialogID, false));
          //   });
        });
    });

  },
  markReadMessage: (chat_id: number, message_ids: Array<number>): ThunkActionType => (dispatch, getState) => {
    if (getState().chat.currentDialogID === chat_id) {
      // Fake read event
      message_ids.forEach(message_id => {
        dispatch(actions.receivedMessageEvent(chat_id, message_id, -1, {
          message_id,
          user_id: getState().profile.profile.id || -1,
          id: 0,
          type: 'read',
          created_at: '',
          updated_at: '',
        }));
      });

      // Push event read
      ChatService.markRead(message_ids);
    }
  },
  calculateCountUnread: (): ThunkActionType => (dispatch, getState) => {
    const currentProfileID = authSelectors.getProfileID(getState());
    const dialogs = chatSelectors.getDialogs(getState());
    let counter = 0;

    dialogs.forEach(dialog => {
      dialog.messages.forEach(message => {
        if (message.owner_id !== currentProfileID) {
          if (message.events.length === 0 ||
            !message.events.some((event: any) => event.type === 'read' && event.user_id === currentProfileID))
          {
            counter++;
          }
        }
      });
    });

    dispatch(chatActions.setCountUnread(counter));
  },
};

export default {
  ...operations,
};
