import React, {ComponentType, FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {authOperations, authSelectors} from '../state/auth';
import {DispatchWithThunk} from '../state/store';

const withAuthController:(component: ComponentType) => ComponentType = (Component) => {
  const RedirectComponent: FC = () => {
    const history = useHistory();
    const dispatch: DispatchWithThunk = useDispatch();

    useEffect(() => {
      dispatch(authOperations.getMeProfile());
    }, []);

    const isAuth = useSelector(authSelectors.getAuthStatus);
    const isInitialized = useSelector(authSelectors.getInitializeStatus);
    const getMeProfile = useSelector(authSelectors.getInitializeStatus);
    const pathname = history.location.pathname;

    // debugger

    if (isInitialized) {
      if (pathname !== '/login' && !isAuth) {
        return <Redirect to={'/login'}/>;
      }
      if (pathname === '/login' && isAuth) {
        return <Redirect to={'/chat'}/>;
      }
      return <Component/>;
    } else {
      return <div></div>;
    }
  };
  return RedirectComponent;
};

export default withAuthController;
