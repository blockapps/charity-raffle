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
    <Route exact path="/new-lottery" component={NewLottery} />
    <Route exact path="/post-lottery" component={PostLottery} />
    <Route exact path="/participate/:address" component={Participate} />
    <Route exact path="/enter-lottery/:address" component={EnterLottery} />
  </Switch>
);
