import {api} from './index';
import Echo from 'laravel-echo';
import axios from 'axios';

const authorizeChannel = (token: string) => (channel: any, options: any) => {
  return {
    authorize: (socketId: any, callback: any) => {
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/broadcasting/auth',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          socket_id: socketId,
          channel_name: channel.name,
        },
      })
        .then((response) => {
          console.log();
          callback(false, response.data);
        })
        .catch((error) => {
          callback(true, error);
        });
    },
  };
};
export let WS: Echo;

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
  createEcho: (token: string) => {
    WS = new Echo({
      broadcaster: 'pusher',
      key: '1',
      wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      cluster: 'mt1',
      authorizer: authorizeChannel(token),
    });
  },
};
