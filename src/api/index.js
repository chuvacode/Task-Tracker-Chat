import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true
});

export const Auth = {
  login: (username, password) => {
    return api.post('login', {
      username,
      password
    }).then(response => response.data);
  },
  logout: (username, password) => {
    return api.post('logout').then(response => response.data);
  },
  getCookie: () => {
    return api.get('csrf-cookie');
  },
  getMe: () => {
    return api.get('get-me')
      .then(response => response.data);
  }
};

export const Chat = {
  getChats: () => {
    return api.get('chat')
      .then(response => response.data);
  },
  getChat: chat_id => {
    return api.get(`chat/${chat_id}`)
      .then(response => response.data);
  },
  getMessages: chat_id => {
    return api.get(`message/${chat_id}`)
      .then(response => response.data);
  },
  sendMessage: (chat_id, message, timestamp) => {
    return api.post(`message`, {
      chat_id,
      message,
      timestamp
    })
      .then(response => response.data);
  }
};

export const User = {
  getProfiles: user_ids => {
    return api.get(`user?ids=${user_ids}`)
      .then(response => {
        return response.data;
      });
  }
};
