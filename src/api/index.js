import axios from "axios";

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
