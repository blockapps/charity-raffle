import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lottery from '../Lottery';
import { lotteryListRequest } from './lotterylist.actions';
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
      self.props.lotteryListRequest()
    }, 5 * 1000);
  }

  render() {

    const lotteries = Array.isArray(this.props.lotteries)
      ? this.props.lotteries
        .filter((item) => {
          const remaining = item.ticketCount - item.entries.length;
          return (this.props.displayCompleted && remaining <= 0)
            || (this.props.displayInProgress && remaining > 0)
        })
        .map((item, i) => {
          return (<Lottery key={i} lotteryData={item} showAll={this.props.showAll} />)
        })
      : [];

    return (
      <section>
        <div>
          {lotteries}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    lotteries: state.lotteryList.lotteries,
    displayCompleted: state.lotteryList.displayCompleted,
    displayInProgress: state.lotteryList.displayInProgress
  };
}

const connected = connect(
  mapStateToProps,
  { lotteryListRequest }
)(LotteryList);

export default withRouter(connected);
