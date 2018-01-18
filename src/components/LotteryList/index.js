import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lottery from '../Lottery';
import {
  lotteryListRequest, toggleShowCompleted
} from './lotterylist.actions';
import { Switch } from '@blueprintjs/core';
import './lotteryList.css'

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
    }, 5 * 1000);
  }

  render() {
    const lotteries = Array.isArray(this.props.lotteries) ? this.props.lotteries.map((item, i) => {
      return (<Lottery key={i} lotteryData={item} showAll={this.props.showAll} />)
    }) : [];
    return (
      <div className="container-fluid">
        <div className="row lt-v-">
          <div className="row">
            <div className="col-sm-10 col-xs-7">
              <h3>Lotteries</h3>
            </div>
            <div className="col-sm-2 col-xs-5">
              <Switch style={{ float: 'right', marginRight: 10, marginTop: 20 }} label='Show all' className="row text-right" checked={this.props.showAll} onChange={(e) => {
                this.setState({ showAll: !this.props.showAll }, () => {
                  this.props.lotteryListRequest(this.props.showAll)
                  this.props.toggleShowCompleted(this.props.showAll)
                })
              }} />
            </div>
          </div>
        </div>
        <div className="row">
          <table className="rwd-table">
            <tbody>
              <tr className="border-below lt-v-pad-8">
                <th>Name</th>
                <th>Prize Amount</th>
                <th>Tickets Sold</th>
                <th>Tickets Left</th>
                <th>Price/Ticket</th>
                <th>Action</th>
              </tr>
              {lotteries}
            </tbody>
          </table>
        </div>
      </div>
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
    toggleShowCompleted
  }
)(LotteryList);
export default withRouter(connected);
