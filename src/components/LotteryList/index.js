import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Lottery from '../Lottery';
import {
  lotteryListRequest, showAllLotteries
} from './lotterylist.actions';
import { Switch } from '@blueprintjs/core';

class LotteryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: this.props.showAll
    }
    this.startPoll();
    this.requestLotteryList();
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer(){
    clearInterval(this.timeout);
  }

  startPoll() {
    var self = this
    this.timeout = setInterval(function () {
      self.requestLotteryList()
    }, 5*1000);
  }

  requestLotteryList() {
    this.props.lotteryListRequest(this.state.showAll);
  }

  render() {
    const lotteries = Array.isArray(this.props.lotteries) ? this.props.lotteries.map((item, i) =>{
      return (<Lottery key={i} lotteryData={item} showAll={this.props.showAll}/>)
    }) : [];
    return (
      <div className="container-fluid">
        <div className="row lt-v-">
          <div className="row">
            <div className="col-sm-10">
              <h3>{this.state.showAll? "Lotteries":"Lotteries in Progress"}</h3>
            </div>
            <div className="col-sm-2">
              <Switch style={{float:'right',marginRight:10, marginTop: 20}} label='Show all' className="row text-right" checked={this.props.showAll} onChange={(e)=>{
                this.setState({showAll:!this.state.showAll},()=>{
                  this.props.lotteryListRequest(this.state.showAll)
                  this.props.showAllLotteries(this.state.showAll)
                })
              }} />
            </div>
          </div>
        </div>
        <div className="row border-below lt-v-pad-8">
          <div className="col-sm-2">
            <strong>Name</strong>
          </div>
          <div className="col-sm-2">
            <strong>Prize Amount</strong>
          </div>
          <div className="col-sm-2">
            <strong>Tickets Sold</strong>
          </div>
          <div className="col-sm-2">
            <strong>Tickets Left</strong>
          </div>
          <div className="col-sm-2">
            <strong>Price/Ticket</strong>
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
    showAll: state.lotteryList.showAll
  };
}

const connected = connect(
  mapStateToProps,
  {
    lotteryListRequest,
    showAllLotteries
  }
)(LotteryList);
export default withRouter(connected);
