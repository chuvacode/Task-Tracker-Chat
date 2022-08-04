import Login from "./Login";
import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {

  submit = ({login, password}) => {
    this.props.login(login, password)
  };

  render() {
    return <WithReduxFormLogin {...this.props} onSubmit={this.submit}/>
  }
}

let WithReduxFormLogin = reduxForm({form: 'login'})(Login);
export default connect(state => ({
  is_auth: state.profile.isAuth
}), {
  login
})(LoginContainer);


