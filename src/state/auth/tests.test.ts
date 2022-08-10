import {authOperations} from './index';
import {rootReducer, RootState} from '../store';
import {Auth} from '../../api/auth';
import {mockStore} from '../../utils/mockStore';
import {MockStoreEnhanced} from 'redux-mock-store';
import {SET_PROFILE} from './types';

jest.mock('../../api/auth');

let initState: RootState;
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  initState = {
    profile: {
      isInitialized: false,
      isAuth: false,
      profile: {
        id: null,
        name: null,
        image: null,
        email: null,
        username: null,
      },
    },
    chat: {
      dialogs: [
        {
          id: 1,
          type: 'group',
          name: 'Пройти инструктаж по безопасности',
          description: 'Отдел охраны труда',
          image: 'https://picsum.photos/100/100?random=233246',
          messages: [],
        },
        {
          id: 2,
          type: 'group',
          name: 'Реализация товаров и услуг',
          description: 'Отдел продаж',
          image: 'https://picsum.photos/100/100?random=654321',
          messages: [],
        },
        {
          id: 3,
          type: 'group',
          name: 'Провести обучение новых сотрудников',
          description: 'Отдел продаж',
          image: 'https://picsum.photos/100/100?random=23151',
          messages: [],
        },
        {
          id: 4,
          type: 'group',
          name: 'Повесить баннер в холле',
          description: 'Отдел продаж',
          image: 'https://picsum.photos/100/100?random=2332345',
          messages: [],
        },
        {
          id: 5,
          type: 'group',
          name: 'Принять новые компьютеры',
          description: 'Отдел продаж',
          image: 'https://picsum.photos/100/100?random=123141',
          messages: [],
        },
      ],
      profiles: [
        {
          id: 1,
          name: 'Алексей  Чуваков',
          image: 'https://pps.whatsapp.net/v/t61.24694-24/89029284_539129036742910_8242218861925365964_n.jpg?ccb=11-4&oh=01_AVy4fINAsO9HNXuqpTo9FzAgY-NybujkEuFzffMKpsMmCQ&oe=62F83B98',
        },
        {
          id: 2,
          name: 'Карина  Привезенцева',
          image: 'https://picsum.photos/100/100?random=645654',
        },
        {
          id: 3,
          name: 'Марсель  Немировский',
          image: 'https://picsum.photos/100/100?random=687654',
        },
        {
          id: 4,
          name: 'Роман  Гордеев',
          image: 'https://picsum.photos/100/100?random=16545',
        },
      ],
      activeTab: 'group',
      currentDialogID: 1,
      countNewMessages: 1,
      isLoadingChatIds: [],
      selectedMessageIds: [],
    },
    form: {},
  };

  store = mockStore(initState);
  store.replaceReducer(rootReducer);
});


test('success login', async () => {
  const thunk = authOperations.login('test', 'test');
  const mockAuthAPI = Auth as jest.Mocked<typeof Auth>;
  mockAuthAPI.getCookie.mockResolvedValue(true);

  const [first_name, last_name] = ['Алексей', 'Чуваков'];

  const RESULT_PROFILE = {
    id: 1,
    name: `${last_name} ${first_name}`,
    image: 'https://pps.whatsapp.net/v/t61.24694-24/89029284_539129036742910_8242218861925365964_n.jpg?ccb=11-4&oh=01_AVy4fINAsO9HNXuqpTo9FzAgY-NybujkEuFzffMKpsMmCQ&oe=62F83B98',
    email: 'chyika@ya.ru',
    username: 'chyika',
  };

  const FAKE_RESPONSE_API = {
    id: RESULT_PROFILE.id,
    email: RESULT_PROFILE.email,
    username: RESULT_PROFILE.username,
    first_name: first_name,
    last_name: last_name,
    avatar_url: RESULT_PROFILE.image,
    email_verified_at: null,
    created_at: null,
    updated_at: null,
  };

  mockAuthAPI.login.mockResolvedValue(FAKE_RESPONSE_API);

  await thunk(store.dispatch, store.getState, {});

  const CURRENT_ACTION = {
    type: SET_PROFILE,
    payload: {
      profile: {
        ...RESULT_PROFILE,
      },
    },
  };

  const RESULT_ACTION = store.getActions();

  expect(RESULT_ACTION[0]).toEqual(CURRENT_ACTION);

});

export {};
