import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {getAuthStatus, getInitializeStatus} from "../../redux/auth-selectors";
import {getMeProfile} from "../../redux/auth-reducer";

const mapStateToProps = state => ({
  isAuth: getAuthStatus(state),
  isInitialized: getInitializeStatus(state)
});

let AuthController = (Component) => {
  const RedirectComponent = props => {

    useEffect(() => {
      props.getMeProfile();
    });

    if (props.isInitialized) {

      if (props.location.pathname !== "/login" && !props.isAuth) {
        return <Redirect to={'/login'}/>;
      }

      if (props.location.pathname === "/login" && props.isAuth) {
        return <Redirect to={'/chat'}/>;
      }

      return <Component {...props}/>;
    }
  };
  return connect(mapStateToProps, {
    getMeProfile
  })(withRouter(RedirectComponent));
};

export default AuthController;
