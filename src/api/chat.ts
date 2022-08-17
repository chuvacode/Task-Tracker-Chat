import {api} from './index';
import {WS} from './auth';
import {Channel} from 'laravel-echo';

export type MessageSubscriber = (chat_id: number, owner_id: number, message_id: number, timestamp_sent: string,
                                   message: string) => void

const subscribers = {
  messageReceived: [] as MessageSubscriber[],
};

type ChannelObject = {
  name: string
  channel: Channel
}

let channels: Array<ChannelObject> = [];

const handlerNewMessage = () => {
  // @ts-ignore
  WS.private(`chat.${chat_id}`)
    .listen('.new-message-event', (e: any) => {
      subscribers.messageReceived.forEach(s => {
        s(e.message.chat_id, e.message.owner_id, e.message.id, e.message.timestamp_sent, e.message.message);
      });
    });
};

const createChannel = (name: string): ChannelObject => {

  const channel: ChannelObject = {
    name,
    channel: WS.private(name),
  };

  channel.channel.listen('.new-message-event', (e: any) => {
    subscribers.messageReceived.forEach(s => {
      s(e.message.chat_id, e.message.owner_id, e.message.id, e.message.timestamp_sent, e.message.message);
    });
  });

  channels = [...channels, channel];

  return channel;
};

const findChannel = (name: string): ChannelObject | null => {
  if (channels.length === 0) return null;
  const result = channels.filter(channel => channel.name === name);
  if (result.length === 0) return null;
  return result[0];
};

export const Chat = {
  subscribe: (chat_id: number, callback: MessageSubscriber) => {
    // if channel not found, then create
    const findResult = findChannel(`chat.${chat_id}`);
    if (findResult === null) {
      createChannel(`chat.${chat_id}`);
      subscribers.messageReceived = [...subscribers.messageReceived, callback];
      console.log(subscribers.messageReceived);
    }
    // @ts-ignore
    // window.Echo.private(`chat.${chat_id}`)
    //   .listenForWhisper('new-message-event', (e: any) => {
    //     console.log(e);
    //   });
  },
  getChats: async () => {
    await new Promise(resolve => {
      setTimeout(() => {resolve(true);}, 500);
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
