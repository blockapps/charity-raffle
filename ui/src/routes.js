import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from './components/Dashboard/';
import NewLottery from './components/NewLottery/';
import Participate from './components/Participate/';

export const routes = (
  <Switch>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/new-lottery" component={NewLottery} />
    <Route exact path="/participate/:address" component={Participate} />
  </Switch>
);
