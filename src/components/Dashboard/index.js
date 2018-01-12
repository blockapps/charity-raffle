import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NewLottery from '../NewLottery/';
import LotteryList from '../LotteryList/';


class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 text-right lt-v-pad-8">
            <NewLottery />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="pt-card">
              <LotteryList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
