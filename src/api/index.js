import axios from "axios";
import {useDispatch} from "react-redux";
import {formatterTime, setMessages, setProfiles} from "../redux/chat-reducer";

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true
});

export const Auth = {
  getCookie: () => {
    return api.get('csrf-cookie');
  },
  getMe: () => {
    return api.get('get-me')
      .then(response => {
        return response.data;
      });
  }
};

export const Chat = {
  getChats: () => {
    return api.get('chat')
      .then(response => {
        return response.data;
      });
  },
  getChat: chat_id => {
    return api.get(`chat/${chat_id}`)
      .then(response => {
        return response.data;
      });
  },
  getMessages: chat_id => {
    return api.get(`message/${chat_id}`)
      .then(response => {
        return response.data;
      });
  },
  sendMessage: (chat_id, message, timestamp) => {
    return api.post(`message`, {
      chat_id,
      message,
      timestamp
    })
      .then(response => {
        return response.data;
      });
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
