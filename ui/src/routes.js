import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from './components/Dashboard/';
import NewLottery from './components/NewLottery/';
import PostLottery from './components/PostLottery/';
import Participate from './components/Participate/';
import EnterLottery from './components/EnterLottery/';

export const routes = (
  <Switch>
    <Route exact path="/" component={Dashboard}/>
  </Switch>
);
