import axios from 'axios';
import Echo from 'laravel-echo';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
});

// @ts-ignore
window.Pusher = require('pusher-js');

export {User} from './user';
export {Auth} from './auth';
export {Chat} from './chat';
