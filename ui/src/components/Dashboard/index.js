import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LotteryList from '../LotteryList/';


class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right lt-v-pad-8">
            <Link to="/new-lottery">
              <button className="pt-button">Create Lottery</button>
            </Link>
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

export default Dashboard;
