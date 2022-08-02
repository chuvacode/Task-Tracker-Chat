import React, {Fragment} from "react";
import './App.css';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import {Route} from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";
import LoginContainer from "./components/Login/LoginContainer";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";

class App extends React.Component {
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
      </div>
    );
  }
}

// export default App;
export default AuthRedirect(App);
