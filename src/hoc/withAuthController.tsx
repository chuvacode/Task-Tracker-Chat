import React, {ComponentProps, ComponentType, FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {authOperations, authSelectors} from '../state/auth';
import {DispatchWithThunk} from '../state/store';

const withAuthController:(component: ComponentType<ComponentProps<any>>) => ComponentType = (Component) => {
  const RedirectComponent: FC = () => {
    const history = useHistory();
    const dispatch: DispatchWithThunk = useDispatch();
    const isAuth = useSelector(authSelectors.getAuthStatus);
    const isInitialized = useSelector(authSelectors.getInitializeStatus);
    const token = useSelector(authSelectors.getToken);
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
    }, [token])

    if (isInitialized) {
      if (pathname !== '/login' && !isAuth) {
        return <Redirect to={'/login'} />;
      }
      if (pathname === '/login' && isAuth) {
        return <Redirect to={'/chat'} />;
      }
      return <Component/>;
    } else {
      return <div></div>;
    }
  };

  return RedirectComponent;
};

export default withAuthController;
