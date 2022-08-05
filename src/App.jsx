import React, {Fragment} from "react";
import './App.css';
import {getAuthStatus} from "./redux/auth-selectors";
import {compose} from "redux";
import LoginContainer from "./components/Login/LoginContainer";
import {BrowserRouter, Route} from "react-router-dom";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import withAuthController from "./hoc/withAuthController";
import {connect, Provider} from "react-redux";
import store from "./redux/store";

const App = props => {
  const _APP = props => (
    <div className="App">
      <Route path="/login" render={
        () => {
          return <LoginContainer/>
        }
      }/>
      <Route path="/chat/:id?" render={
        () => {
          return (
            <Fragment>
              <SidebarContainer/>
              <div className="content">
                <ChatContainer/>
              </div>
            </Fragment>
          )
        }
      }/>
      <Route exact={!props.isAuth} path="/" render={
        () => {
          return (
            <Fragment>
              <SidebarContainer/>
              <div className="content">
              </div>
            </Fragment>
          )
        }
      }/>
    </div>
  );

  const AppContainer = compose(
    withAuthController,
    connect(mapStateToProps))
  (_APP);

  return <AppContainer/>
};

const mapStateToProps = state => ({
  isAuth: getAuthStatus(state)
});

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

