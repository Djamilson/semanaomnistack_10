import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Routes';

import Dashboard from '~/pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
  </Switch>
);

export default Routes;
