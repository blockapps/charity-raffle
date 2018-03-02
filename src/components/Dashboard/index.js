import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-md';
import { connect } from 'react-redux';

import HowToPlay from '../HowToPlay';
import LotteryList from '../LotteryList';
import NewLottery from '../NewLottery';
import {
  toggleCompletedRaffles, toggleInProgressRaffles
} from '../LotteryList/lotterylist.actions';
import './dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="md-grid">
            <div className="md-cell md-cell--12">
              <HowToPlay />
              <NewLottery />
              <section className="lottery-buttons">
                <Button
                  raised
                  primary
                  className={`${this.props.displayInProgress ? 'lbutton-highlighted' : ''} in-progress-btn`}
                  onClick={(e) => {
                    this.props.toggleInProgressRaffles();
                  }}
                > Raffles in progress </Button>
                <Button
                  raised
                  primary
                  className={this.props.displayCompleted ? 'lbutton-highlighted' : ''}
                  onClick={(e) => {
                    this.props.toggleCompletedRaffles();
                  }}
                > Completed </Button>
              </section>
            </div>
          </div>
          <div className="row">
            <div className="md-grid">
              <div className="md-cell md-cell--12">
                <LotteryList />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    displayCompleted: state.lotteryList.displayCompleted,
    displayInProgress: state.lotteryList.displayInProgress
  };
}

const connected = connect(
  mapStateToProps,
  {
    toggleCompletedRaffles,
    toggleInProgressRaffles
  }
)(Dashboard);

export default withRouter(connected);
