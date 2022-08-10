import * as api from '../../api';
import actions from './actions';
import {ThunkActionType} from '../store';

const operations = {
    getMeProfile: (): ThunkActionType => (dispatch) => {
        api.Auth.getMe()
            .then(profile => {
                dispatch(actions.setProfile({
                    id: profile.id,
                    name: `${profile.first_name} ${profile.last_name}`,
                    image: profile.avatar_url,
                    email: profile.email,
                    username: profile.username,
                }));
            })
            .catch(response => {
                if (response.status === 401) {
                    dispatch(actions.removeProfile());
                }
            })
            .finally(() => {
                dispatch(actions.setIsInitialized(true));
            });
    },
    login: (login: string, password: string): ThunkActionType => (dispatch) => {
        api.Auth.getCookie().then(() => {
            api.Auth.login(login, password)
                .then(profile => {
                    dispatch(actions.setProfile({
                        id: profile.id,
                        name: `${profile.first_name} ${profile.last_name}`,
                        image: profile.avatar_url,
                        email: profile.email,
                        username: profile.username,
                    }));
                });
        });
    },
    logout: (): ThunkActionType => (dispatch) => {
        api.Auth.logout()
            .then(response => {
                dispatch(actions.removeProfile());
            });
    },
};

export default {
    ...operations,
};
