import * as api from '../../api';
import {removeProfile} from '../auth/actions';
import * as actions from './actions';
import {Message, Profile} from './models';
import {formatterTime} from '../../utils';

const getChats = () => (dispatch: any) => {
    api.Chat.getChats()
        .then(chats => {
            dispatch(actions.setDialogs(chats.items.map((dialog: any) => {
                return {
                    id: dialog.id,
                    type: dialog.type,
                    name: dialog.meta.name,
                    description: dialog.meta.description,
                    image: dialog.meta.image_url,
                    messages: [],
                };
            })));
        })
        .catch(response => {
            if (response.status === 401) {
                dispatch(removeProfile());
            }
        });
};
const activeDialog = (chat_id: number) => (dispatch: any, state: any) => {
    // try activate current chat
    if (state().chat.currentDialogID === chat_id) return;
    dispatch(actions.allUnselect());
    dispatch(actions.setStatusLoadingChat(chat_id, true));
    dispatch(actions.setActiveDialog(chat_id));
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
                            id: 1,
                            name: `${profile.first_name}  ${profile.last_name}`,
                            image: profile.avatar_url,
                        };
                    })));
                    dispatch(actions.setStatusLoadingChat(chat_id, false));
                });
        });
};
const sendMessage = (message: string) => (dispatch: any, state: any) => {
    state = state().chat;
    if (!message || message.trim() === '') return;
    api.Chat.sendMessage(state.currentDialogID, message, Date.now())
        .then(message => {
            dispatch(actions.addNewMessage(message.id, message.message));
        });
};
const deleteMessages = () => (dispatch: any, state: any) => {
    state = state().chat;
    const message_ids = state.selectedMessageIds;

    api.Chat.deleteMessages(message_ids).then(status => {
        dispatch(actions.allUnselect());
        dispatch(actions.setStatusLoadingChat(state.currentDialogID, true));
        dispatch(actions.setActiveDialog(state.currentDialogID));
        api.Chat.getMessages(state.currentDialogID)
            .then(messages => {
                // Set Messages
                dispatch(actions.setMessages(state.currentDialogID, messages.items.map((message: any) => {
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
                    !(state.profiles.some((profile: Profile) => profile.id === id)));

                if (user_ids.length === 0) {
                    return dispatch(actions.setStatusLoadingChat(state.currentDialogID, false));
                }

                // Get Profiles
                api.User.getProfiles(user_ids)
                    .then(profiles => {
                        dispatch(actions.addProfiles(profiles.items.map((profile: any) => {
                            return {
                                id: profile.id,
                                name: `${profile.first_name}  ${profile.last_name}`,
                                image: profile.avatar_url,
                            };
                        })));
                        dispatch(actions.setStatusLoadingChat(state.currentDialogID, false));
                    });
            });
    });
};

export {
    getChats,
    activeDialog,
    sendMessage,
    deleteMessages,
};
