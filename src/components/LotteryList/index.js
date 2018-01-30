import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lottery from '../Lottery';
import {
  lotteryListRequest, toggleShowCompleted, raffleInProgess
} from './lotterylist.actions';
import { Switch, Button } from 'react-md';
import './lotteryList.css';

class LotteryList extends Component {

  componentWillMount() {
    this.startPoll();
    this.props.lotteryListRequest(this.props.showAll);
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer() {
    clearInterval(this.timeout);
  }

  startPoll() {
    var self = this
    this.timeout = setInterval(function () {
      self.props.lotteryListRequest(self.props.showAll)
    }, 1000);
  }

  render() {

    const lotteries = Array.isArray(this.props.lotteries) ? this.props.lotteries.map((item, i) => {
      return (<Lottery key={i} lotteryData={item} showAll={this.props.showAll} />)
    }) : [];

    return (
      <section>
        <div className="md-grid">
          <div className="md-cell md-cell--10 lottery-buttons">
            <Button
              raised
              primary
              onClick={(e) => {
                this.props.lotteryListRequest(false);
                this.props.raffleInProgess();
              }}
            > Raffle's in progress </Button>
            <Button
              raised
              primary
            > Completed </Button>
          </div>
          <div className="md-cell md-cell--2">
            <Switch
              id="lottery-switch"
              type="switch"
              label="Show all"
              name="lottery-switch"
              checked={this.props.showAll}
              onChange={(e) => {
                this.setState({ showAll: !this.props.showAll }, () => {
                  this.props.lotteryListRequest(this.props.showAll);
                  this.props.toggleShowCompleted();
                })
              }}
            />
          </div>
        </div>
        {lotteries}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    lotteries: state.lotteryList.lotteries,
    showAll: state.lotteryList.showAll
  };
}

const connected = connect(
  mapStateToProps,
  {
    lotteryListRequest,
    toggleShowCompleted,
    raffleInProgess
  }
)(LotteryList);

export default withRouter(connected);
