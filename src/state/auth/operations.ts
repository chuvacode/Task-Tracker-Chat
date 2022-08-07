import * as api from '../../api';
import * as actions from './actions';

const getMeProfile = () => (dispatch: any) => {
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
};
const login = (login: string, password: string) => (dispatch: any) => {
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
};
const logout = () => (dispatch: any) => {
    api.Auth.logout()
        .then(response => {
            dispatch(actions.removeProfile());
        });
};

export {
    getMeProfile,
    login,
    logout,
};
