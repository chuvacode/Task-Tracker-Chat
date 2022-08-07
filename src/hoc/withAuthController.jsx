import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {getAuthStatus, getInitializeStatus} from '../state/auth/selectors';
import {compose} from 'redux';
import {getMeProfile} from '../state/auth/operations';

const mapStateToProps = state => ({
  isAuth: getAuthStatus(state),
  isInitialized: getInitializeStatus(state),
});

const withAuthController = Component => {
  const RedirectComponent = props => {

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
    }
  };
  return compose(
    connect(mapStateToProps, {getMeProfile}),
    withRouter)
  (RedirectComponent);
};

export default withAuthController;
