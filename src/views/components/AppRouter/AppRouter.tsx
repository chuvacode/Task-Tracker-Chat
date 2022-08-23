import React, {FC} from 'react';
import {authSelectors} from '../../../state/auth';
import {privateRoutes, publicRoutes} from '../../../router';
import {Route, Switch} from 'react-router-dom';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Sidebar from '../Sidebar/Sidebar';

const AppRouter: FC = () => {
  const authStatus = useAppSelector(authSelectors.getAuthStatus);

  return <Switch>
      {
        authStatus ?
          privateRoutes.map(route => {
            const Component = route.component;
            return (
              <Route path={route.path} exact={route.excect} component={() => <>
                <Sidebar />
                <Component />
              </>} key={route.path}/>
            );
          })
          :
          publicRoutes.map(route =>
            <Route path={route.path} exact={route.excect} component={route.component} key={route.path}/>,
          )
      }

      <Route path="/" exact={!authStatus} render={() => <Sidebar />} />
    </Switch>;
};

export default AppRouter;
