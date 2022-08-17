import * as api from '../../api';
import actions from './actions';
import {RootState, ThunkActionType} from '../store';
import {ThunkAction} from 'redux-thunk/es/types';
import {Action} from 'redux';

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
  // login: function (): ThunkDispatch<RootState, unknown, ActionTypes> {
  //   return (dispatch: Dispatch) => {
  //     console.log('32');
  //   }
  // },
  login: (login: string, password: string): ThunkActionType => async (dispatch) => {

    const statusCookie = await api.Auth.getCookie();
    const profile = await api.Auth.login(login, password);

    dispatch(actions.setProfile({
      id: profile.id,
      name: `${profile.last_name} ${profile.first_name}`,
      image: profile.avatar_url,
      email: profile.email,
      username: profile.username,
    }));

  },
  logout: (): ThunkActionType => (dispatch) => {
    api.Auth.logout()
      .then(response => {
        dispatch(actions.removeProfile());
      });
  },
  getToken: (): ThunkActionType => async (dispatch) => {
    const token = await api.Auth.getToken();
    if (!!token && token !== '') {
      dispatch(actions.setToken(token));
    }
  },
  createEcho: (): ThunkActionType => (dispatch, getState) => {
    const state = getState();
    if (state.profile.token) {
      api.Auth.createEcho(state.profile.token);
    }
  },
};

type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default {
  ...operations,
};
