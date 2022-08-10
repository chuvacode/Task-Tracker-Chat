import {api} from './index';

export const Chat = {
  getChats: async () => {
    await new Promise(resolve => {
      setTimeout(() => {resolve(true)}, 500)
    });
    return api.get('chat')
      .then(response => response.data)
      .catch(reason => {
        throw reason.response;
      });
  },
  getChat: (chat_id: number) => {
    return api.get(`chat/${chat_id}`)
      .then(response => response.data);
  },
  getMessages: (chat_id: number) => {
    return api.get(`message/${chat_id}`)
      .then(response => response.data);
  },
  deleteMessages: (message_ids: Array<number>) => {
    return api.delete(`message/${message_ids}`)
      .then(response => response.data);
  },
  sendMessage: (chat_id: number, message: string, timestamp: number) => {
    return api.post('message', {
      chat_id,
      message,
      timestamp,
    })
      .then(response => response.data);
  },
};
