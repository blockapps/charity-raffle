import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HowToPlay from '../HowToPlay';
import LotteryList from '../LotteryList';


class Dashboard extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="md-grid">
            <div className="md-cell md-cell--12">
              <HowToPlay />
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
      </section>
    );
  }
}

export default withRouter(Dashboard);
