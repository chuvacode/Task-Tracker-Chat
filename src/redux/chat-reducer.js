let initialState = {
  dialogs: [],
  profiles: [],
  activeType: "group",
  currentDialogID: 1,
  textNewMessage: "",
  countNewMessages: 1
};

let UPDATE_TEXT_NEW_MESSAGE = "UPDATE_TEXT_NEW_MESSAGE";
let ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";
let SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
let SET_DIALOGS = "SET_DIALOGS";
let SET_MESSAGES = "SET_MESSAGES";
let SET_PROFILES = "SET_PROFILES";

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
                  profile: {
                    id: 1,
                    name: "Чуваков Алексей",
                    image: "https://picsum.photos/100/100?random=2534",
                  },
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
        currentDialogID: action.dialogID
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
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.profiles
      };
    default:
      return state;
  }
};

export let updateTextNewMessageAC = (text) => {
  return {
    type: UPDATE_TEXT_NEW_MESSAGE,
    text: text
  }
};

export let addNewMessageAC = () => {
  return {
    type: ADD_NEW_MESSAGE
  }
};

export let setActiveDialogAC = (dialogID) => {
  return {
    type: SET_ACTIVE_DIALOG,
    dialogID: dialogID
  }
};

export let setDialogsAC = (dialogs) => {
  return {
    type: SET_DIALOGS,
    dialogs: dialogs
  }
};

export let setMessagesAC = (chat_id, messages) => {
  return {
    type: SET_MESSAGES,
    chat_id: chat_id,
    messages: messages
  }
};

export let setProfilesAC = (profiles) => {
  return {
    type: SET_PROFILES,
    profiles: profiles
  }
};


export let formatterTime = (DateTime) => {
  let h = (DateTime.getHours() > 10 ? DateTime.getHours() : "0" + DateTime.getHours());
  let m = (DateTime.getMinutes() > 10 ? DateTime.getMinutes() : "0" + DateTime.getMinutes());
  return h + ":" + m;
};

export default ChatReducer;
