import React, {ComponentType, FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {authOperations, authSelectors} from '../state/auth';
import {RootState} from '../state/store';

type MapStateToProps = ReturnType<typeof mapStateToProps>

type MapDispatchToProps = {
  getMeProfile: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState) => ({
  isAuth: authSelectors.getAuthStatus(state),
  isInitialized: authSelectors.getInitializeStatus(state),
});

type HOK<P> = (component: ComponentType<P>) => ComponentType

const withAuthController:HOK<Props> = (Component) => {

  const RedirectComponent: FC<Props & RouteComponentProps> = (props) => {

    useEffect(() => {
      props.getMeProfile();
    }, []);

    if (props.isInitialized) {

      if (props.location.pathname !== '/login' && !props.isAuth) {
        return <Redirect to={'/login'}/>;
      }

      if (props.location.pathname === '/login' && props.isAuth) {
        return <Redirect to={'/chat'}/>;
      }

      return <Component {...props}/>;
    } else {
      return <div></div>;
    }
  };

  return compose<ComponentType>(
      connect(mapStateToProps, {
        getMeProfile: authOperations.getMeProfile,
      }),
      withRouter)
  (RedirectComponent);

};

export default withAuthController;
