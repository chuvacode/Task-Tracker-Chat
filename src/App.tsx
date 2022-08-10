import React, {ComponentType, FC, Fragment} from 'react';
import './App.css';
import {compose} from 'redux';
import LoginContainer from './views/components/Login/LoginContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import SidebarContainer from './views/components/Sidebar/SidebarContainer';
import ChatContainer from './views/components/Chat/ChatContainer';
import withAuthController from './hoc/withAuthController';
import {connect, Provider} from 'react-redux';
import reduxStore from './state/store';
import {authSelectors} from './state/auth';

const App: ComponentType = () => {
  const RootHTML = (props: any) => (
    <div className="App">
      <Route path="/login" render={
        () => {
          return <LoginContainer/>;
        }
      }/>
      <Route path="/chat/:id?" render={
        () => (
          <Fragment>
            <SidebarContainer {...props} />
            <div className="content">
              <ChatContainer/>
            </div>
          </Fragment>
        )
      }/>
      <Route exact={!props.isAuth} path="/" render={
        () => {
          return (
            <Fragment>
              <SidebarContainer {...props} />
              <div className="content">
              </div>
            </Fragment>
          );
        }
      }/>
    </div>
  );

  const AppContainer = compose<ComponentType>(
    withAuthController,
    connect(mapStateToProps))
  (RootHTML);

  return <AppContainer/>;
};

const mapStateToProps = (state: any) => ({
  isAuth: authSelectors.getAuthStatus(state),
});

export default () => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
