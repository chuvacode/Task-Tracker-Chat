import actions from './actions';
import {ThunkActionType} from '../store';
import {AuthService} from '../../api/AuthService';
import axios from 'axios';
import {FormikHelpers} from 'formik';
import {Profile} from './models';
import {Dispatch} from 'redux';

const setProfile = (profile: Profile, dispatch: Dispatch) => {
  dispatch(actions.setProfile({
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    avatar_url: profile.avatar_url,
    email: profile.email,
    username: profile.username,
  }));
};

type LoginFormDara = {
  login: string
  password: string
}

const operations = {
  getMeProfile: (): ThunkActionType => async (dispatch) => {
    try {
      const profile = await AuthService.getMe();
      setProfile(profile, dispatch);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          dispatch(actions.removeProfile());
        }
      }
    }
    dispatch(actions.setIsInitialized(true));

  },
  login: (login: string, password: string, helpers: FormikHelpers<LoginFormDara>): ThunkActionType => async (dispatch) => {
    try {
      const statusCookie = await AuthService.getCookie();
      const profile = await AuthService.login(login, password);
      setProfile(profile, dispatch);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 422) {
          helpers.setErrors({
            password: 'Неправильный пароль или логин',
          });
        } else {
          console.log(e);
        }
      }
    }
    helpers.setSubmitting(false);
  },
  logout: (): ThunkActionType => async (dispatch) => {
    await AuthService.logout();
    dispatch(actions.removeProfile());
  },
  getToken: (): ThunkActionType => async (dispatch) => {
    const token = await AuthService.getToken();
    if (!!token && token !== '') {
      dispatch(actions.setToken(token));
    }
  },
  createEcho: (): ThunkActionType => (dispatch, getState) => {
    const state = getState();
    if (state.profile.token) {
      AuthService.createEcho(state.profile.token);
    }
  },
};

export default {
  ...operations,
};
