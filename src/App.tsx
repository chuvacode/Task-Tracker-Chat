import React, {ComponentType} from 'react';
import './App.css';
import {compose} from 'redux';
import withAuthController from './hoc/withAuthController';
import AppRouter from './views/components/AppRouter/AppRouter';
import { withRouter } from 'react-router-dom';

const _App: ComponentType = () => (
  <div className="App">
    <AppRouter />
  </div>
);

export default compose<ComponentType>(
  withAuthController,
  // withRouter,
)(_App);
