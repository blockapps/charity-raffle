import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lottery from '../Lottery';
import {
  lotteryListRequest,
} from './lotterylist.actions';

class LotteryList extends Component {
  constructor(props) {
    super(props);
    this.startPoll();
    this.requestLotteryList();
  }

  startPoll() {
    const fetchLotteries = this.props.lotteryListRequest;
    this.timeout = setInterval(function () {
      fetchLotteries();
    }, 5*1000);
  }

  requestLotteryList() {
    this.props.lotteryListRequest();
  }

  render() {
    const lotteries = this.props.lotteries.map((item, i) =>{
      return (<Lottery key={i} lotteryData={item} />)
    });
    return (
      <div className="container-fluid">
        <div className="row lt-v-">
          <div className="col-sm-12">
            <h3>Lotteries in Progress</h3>
          </div>
        </div>
        <div className="row border-below lt-v-pad-8">
          <div className="col-sm-3">
            <strong>Name</strong>
          </div>
          <div className="col-sm-3">
            <strong>Prize</strong>
          </div>
          <div className="col-sm-3">
            <strong>Tickets Sold</strong>
          </div>
        </div>
        {lotteries}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    lotteries: state.lotteryList.lotteries,
  };
}


const connected = connect(
  mapStateToProps,
  {
    lotteryListRequest,
  }
)(LotteryList);
export default withRouter(connected);
