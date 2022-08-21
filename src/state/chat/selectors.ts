import {RootState} from '../store';

const getCurrentChat = (state: RootState) => {
    return (state.chat.dialogs.filter(dialog => {
        if (dialog.id === state.chat.currentDialogID) {
            return dialog;
        }
    }))[0];
};

const selectors = {
    getCurrentChat: (state: RootState) => {
        return getCurrentChat(state);
    },
    getNameCurrentChat: (state: RootState) => {
        return getCurrentChat(state).name;
    },
    getCurrentDialogID: (state: RootState) => {
        return state.chat.currentDialogID;
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
    getActiveTab: (state: RootState) => {
        return state.chat.activeTab;
    },
    getDialogs: (state: RootState) => {
        return state.chat.dialogs;
    },
    getCountUnread: (state: RootState) => {
        return state.chat.countUnread;
    },
};

export default {
    ...selectors,
};
