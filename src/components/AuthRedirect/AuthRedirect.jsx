import React from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";

const mapStateToProps = state => ({
  isAuth: state.profile.isAuth
});

let AuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (this.props.location.pathname !== "/login" && !this.props.isAuth) {
        return <Redirect to={'login'}/>;
      }

      if (this.props.location.pathname === "/login" && this.props.isAuth) {
        return <Redirect to={'chat'}/>;
      }

      return <Component {...this.props}/>;
    }
  }
  return connect(mapStateToProps)(withRouter(RedirectComponent));
};

export default AuthRedirect;
