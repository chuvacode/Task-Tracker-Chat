let initialState = {
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
  textNewMessage: "",
  countNewMessages: 1
};

let UPDATE_TEXT_NEW_MESSAGE = "UPDATE_TEXT_NEW_MESSAGE";
let ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

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
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
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
          },
        ],
        textNewMessage: ""
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

export default ChatReducer;
