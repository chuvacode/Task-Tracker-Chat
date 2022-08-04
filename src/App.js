import React, {Component, Fragment} from "react";
import './App.css';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import {Route} from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";
import LoginContainer from "./components/Login/LoginContainer";
import AuthController from "./components/AuthController/AuthController";

class App extends Component {

  render() {
    return (
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
        {/*<Route path="/" render={
          () => {
            return (
              <Fragment>
                <SidebarContainer/>
                <div className="content">
                </div>
              </Fragment>
            )
          }
        }/>*/}
      </div>
    );
  }
}

export default AuthController(App);
