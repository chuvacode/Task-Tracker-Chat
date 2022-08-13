import React, {ComponentType, Fragment} from 'react';
import './App.css';
import {compose} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import SidebarContainer from './views/components/Sidebar/SidebarContainer';
import ChatContainer from './views/components/Chat/ChatContainer';
import withAuthController from './hoc/withAuthController';
import {Provider, useSelector} from 'react-redux';
import reduxStore from './state/store';
import {authSelectors} from './state/auth';
import LoginPage from './views/pages/LoginPage/LoginPage';

const App: ComponentType = () => {

  const RootHTML = () => {
    const isAuth = useSelector(authSelectors.getAuthStatus);
    return (
      <div className="App">
          <Route path="/login" render={
            () => {
              return <LoginPage/>;
            }
          }/>
          <Route path="/chat/:id?" render={
            () => (
              <Fragment>
                <SidebarContainer />
                <div className="content">
                  <ChatContainer/>
                </div>
              </Fragment>
            )
          }/>
          <Route exact={!isAuth} path="/" render={
            () => {
              return (
                <Fragment>
                  <SidebarContainer />
                  <div className="content">
                  </div>
                </Fragment>
              );
            }
          }/>
      </div>
    );
  };

  const AppContainer = compose<ComponentType>(
    withAuthController,
  )(RootHTML);

  return <AppContainer/>;
};

export default () => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
