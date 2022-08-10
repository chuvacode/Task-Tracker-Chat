import {RootState} from '../store';

const getCurrentChat = (state: RootState) => {
    return (state.chat.dialogs.filter(dialog => {
        if (dialog.id === state.chat.currentDialogID) {
            return dialog;
        }
    }))[0];
};

const selectors = {
    getCountNewMessage: (state: RootState) => {
        return state.chat.countNewMessages;
    },
    getCurrentChat: (state: RootState) => {
        return getCurrentChat(state);
    },
    getNameCurrentChat: (state: RootState) => {
        return getCurrentChat(state).name;
    },
    getDescriptionCurrentChat: (state: RootState) => {
        return getCurrentChat(state).description;
    },
    getSelectedMessageIDs: (state: RootState) => {
        return state.chat.selectedMessageIds;
    },
    getIsLoadingChatIDs: (state: RootState) => {
        return state.chat.isLoadingChatIds;
    },
    getProfiles: (state: RootState) => {
        return state.chat.profiles;
    },
};

export default {
    ...selectors,
};
