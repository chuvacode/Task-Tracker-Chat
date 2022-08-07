import React, {Fragment} from 'react';
import './App.css';
import {getAuthStatus} from './state/auth/selectors';
import {compose} from 'redux';
import LoginContainer from './components/Login/LoginContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import ChatContainer from './components/Chat/ChatContainer';
import withAuthController from './hoc/withAuthController';
import {connect, Provider} from 'react-redux';
import reduxStore from './state/store';

const App = () => {
  const RootHTML = (props: any) => (
    <div className="App">
      <Route path="/login" render={
        () => {
          return <LoginContainer/>;
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
          );
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
          );
        }
      }/>
    </div>
  );

  const AppContainer = compose(
    withAuthController,
    connect(mapStateToProps))
  (RootHTML);

  return <AppContainer/>;
};

const mapStateToProps = (state: any) => ({
  isAuth: getAuthStatus(state),
});

export default () => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
