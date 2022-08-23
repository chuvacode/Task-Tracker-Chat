import React, {ComponentProps, ComponentType, FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {authOperations, authSelectors} from '../state/auth';
import {AppDispatch} from '../state/store';
import {useAppSelector} from '../hooks/useAppSelector';

const withAuthController:(component: ComponentType<ComponentProps<any>>) => ComponentType = (Component) => {
  const RedirectComponent: FC = () => {
    const history = useHistory();
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useAppSelector(authSelectors.getAuthStatus);
    const isInitialized = useAppSelector(authSelectors.getInitializeStatus);
    const token = useAppSelector(authSelectors.getToken);
    const pathname = history.location.pathname;

    useEffect(() => {
      if (!isInitialized) {
        dispatch(authOperations.getMeProfile());
      }
    }, [isInitialized]);

    useEffect(() => {
      if (isAuth && !token) dispatch(authOperations.getToken());
    }, [isAuth, token]);

    // Create Echo
    useEffect(() => {
      if (token !== null) {
        dispatch(authOperations.createEcho());
      }
    }, [token]);

    if (isInitialized) {
      if (pathname !== '/login' && !isAuth) {
        history.replace('/login');
      }
      if (pathname === '/login' && isAuth) {
        history.replace('/chat');
      }
      return <Component/>;
    } else {
      return <div></div>;
    }
  };

  return RedirectComponent;
};

export default withAuthController;
