let initialState = {
  dialogs: [
    {
      id: 1,
      type: "group",
      name: "Пройти инструктаж по безопасности",
      image: "https://picsum.photos/100/100?random=1",
      description: "Отдел охраны труда",
      messages: [
        {
          id: 1,
          profile: {
            id: 2534,
            name: "Карина Привезенцева",
            image: "https://picsum.photos/100/100?random=2534",
          },
          messageText: "Привет! Заполняю сейчас документ по «Ромашке». Какие им нужны гвозди и сколько штук? Уточни, пожалуйста.",
          timeSending: "11:01"
        },
        {
          id: 2,
          profile: {
            id: 5466,
            name: "Марсель Немировский",
            image: "https://picsum.photos/100/100?random=7",
          },
          messageText: "Валерия, твои пироги просто бомба! 😋 Обалдеть! Просто невероятно вкусно!",
          timeSending: "12:17"
        },
        {
          id: 3,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо большое, Марсель, я очень старалась 😊 Коллеги, приглашаю вас тоже попробовать пирог. Не стесняйтесь 🙏",
          timeSending: "12:18"
        },
        {
          id: 4,
          profile: {
            id: 246234,
            name: "Роман Гордеев",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "☝ Уточнил: медные 60 шт.",
          timeSending: "13:03"
        },
        {
          id: 4,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо, сейчас заполню 😌",
          timeSending: "13:07"
        }
      ],
    },
    {
      id: 2,
      type: "group",
      name: "Реализация товаров и услуг",
      image: "https://picsum.photos/100/100?random=2",
      description: "Отдел продаж",
      messages: [
        {
          id: 1,
          profile: {
            id: 2534,
            name: "Карина Привезенцева",
            image: "https://picsum.photos/100/100?random=2534",
          },
          messageText: "Привет! Заполняю сейчас документ по «Ромашке». Какие им нужны гвозди и сколько штук? Уточни, пожалуйста.",
          timeSending: "11:01"
        },
        {
          id: 2,
          profile: {
            id: 5466,
            name: "Марсель Немировский",
            image: "https://picsum.photos/100/100?random=7",
          },
          messageText: "Валерия, твои пироги просто бомба! 😋 Обалдеть! Просто невероятно вкусно!",
          timeSending: "12:17"
        },
        {
          id: 3,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо большое, Марсель, я очень старалась 😊 Коллеги, приглашаю вас тоже попробовать пирог. Не стесняйтесь 🙏",
          timeSending: "12:18"
        },
        {
          id: 4,
          profile: {
            id: 246234,
            name: "Роман Гордеев",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "☝ Уточнил: медные 60 шт.",
          timeSending: "13:03"
        },
        {
          id: 4,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо, сейчас заполню 😌",
          timeSending: "13:07"
        }
      ],
    },
    {
      id: 3,
      type: "group",
      name: "Провести обучение новых сотрудни...",
      image: "https://picsum.photos/100/100?random=3",
      description: "Отдел продаж",
      messages: [
        {
          id: 1,
          profile: {
            id: 2534,
            name: "Карина Привезенцева",
            image: "https://picsum.photos/100/100?random=2534",
          },
          messageText: "Привет! Заполняю сейчас документ по «Ромашке». Какие им нужны гвозди и сколько штук? Уточни, пожалуйста.",
          timeSending: "11:01"
        },
        {
          id: 2,
          profile: {
            id: 5466,
            name: "Марсель Немировский",
            image: "https://picsum.photos/100/100?random=7",
          },
          messageText: "Валерия, твои пироги просто бомба! 😋 Обалдеть! Просто невероятно вкусно!",
          timeSending: "12:17"
        },
        {
          id: 3,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо большое, Марсель, я очень старалась 😊 Коллеги, приглашаю вас тоже попробовать пирог. Не стесняйтесь 🙏",
          timeSending: "12:18"
        },
        {
          id: 4,
          profile: {
            id: 246234,
            name: "Роман Гордеев",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "☝ Уточнил: медные 60 шт.",
          timeSending: "13:03"
        },
        {
          id: 4,
          profile: {
            id: 1,
            name: "Чуваков Алексей",
            image: "https://picsum.photos/100/100?random=8",
          },
          messageText: "Спасибо, сейчас заполню 😌",
          timeSending: "13:07"
        }
      ],
    }
  ],
  activeType: "group",
  currentDialogID: 1,
  textNewMessage: "",
  countNewMessages: 1
};

let UPDATE_TEXT_NEW_MESSAGE = "UPDATE_TEXT_NEW_MESSAGE";
let ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";
let SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";

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
                  timeSending: ((DateNow) => {
                      let h = (DateNow.getHours() > 10 ? DateNow.getHours() : "0" + DateNow.getHours());
                      let m = (DateNow.getMinutes() > 10 ? DateNow.getMinutes() : "0" + DateNow.getMinutes());
                      return h + ":" + m;
                    }
                  )(new Date())
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

export default ChatReducer;
