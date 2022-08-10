import {api} from './index';

export const User = {
  getProfiles: (user_ids: Array<number>) => {
    return api.get(`user?ids=${user_ids}`)
      .then(response => {
        return response.data;
      });
  },
};
