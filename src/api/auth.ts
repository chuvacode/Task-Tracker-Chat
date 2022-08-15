import {api} from './index';

export const Auth = {
  login: (username: string, password: string) => {
    return api.post('login', {
      username,
      password,
    }).then(response => response.data);
  },
  logout: () => {
    return api.post('logout').then(response => response.data);
  },
  getCookie: () => {
    return api.get('csrf-cookie').then(response => true);
  },
  getMe: () => {
    return api.get('get-me')
      .then(response => response.data)
      .catch(reason => {
        throw reason.response;
      });
  },
  getToken: () => {
    return api.post('sanctum/token')
      .then(response => response.data)
      .catch(reason => {
        throw reason.response;
      });
  },
};
