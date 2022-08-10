import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
});

export {User} from './user';
export {Auth} from './auth';
export {Chat} from './chat';
