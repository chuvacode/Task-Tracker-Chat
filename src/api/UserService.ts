import {api} from './index';
import {Profile} from '../state/auth/models';

export const UserService = {
  getProfiles: (user_ids: Array<number>) => {
    return api.get(`user?ids=${user_ids}`)
      .then(response => response.data);
  },
  updateProfile: (profile: Profile) => {
    return api.patch(`user/${profile.id}`, profile)
      .then(response => response.data);
  },
};
