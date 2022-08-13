import React, {ComponentProps, ComponentType, FC, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {authOperations, authSelectors} from '../state/auth';
import {DispatchWithThunk} from '../state/store';

const withAuthController2:(component: ComponentType<ComponentProps<any>>) => ComponentType = (Component) => {
  const RedirectComponent: FC = () => {
    const history = useHistory();
    const dispatch: DispatchWithThunk = useDispatch();
    const isAuth = useSelector(authSelectors.getAuthStatus);
    const isInitialized = useSelector(authSelectors.getInitializeStatus);
    const pathname = history.location.pathname;

    useEffect(() => {
      dispatch(authOperations.getMeProfile());
    }, []);

    if (isInitialized) {
      if (pathname !== '/login' && !isAuth) {
        history.push('/login');
      }
      if (pathname === '/login' && isAuth) {
        history.push('/chat');
      }
      return <Component/>;
    } else {
      return <div></div>;
    }
  };

  return RedirectComponent;
};

export default withAuthController2;
