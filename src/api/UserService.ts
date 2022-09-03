import {api} from './index';
import {IProfile} from '../state/auth/models';

export const UserService = {
  getProfiles: (user_ids: Array<number>) => {
    return api.get(`user?ids=${user_ids}`)
      .then(response => response.data);
  },
  updateProfile: (profile: IProfile) => {
    return api.patch<IProfile>(`user/${profile.id}`, profile)
      .then(response => response.data);
  },
};
