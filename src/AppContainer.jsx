import React from "react";
import {connect} from "react-redux";
import App from "./App";
import {getMeProfile} from "./redux/profile-reducer";

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.getMeProfile();
  }

  render() {
    return <App/>;
  }
}

const mapDispatchToState = {
  getMeProfile,
};

export default connect(null, mapDispatchToState)(AppContainer)
