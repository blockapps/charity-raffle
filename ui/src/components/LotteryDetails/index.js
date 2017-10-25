import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLotteryDetails } from './selectors';
import {
  lotteryListRequest,
} from '../LotteryList/lotterylist.actions';
import { Button } from '@blueprintjs/core';

class LotteryDetails extends Component {
  constructor(props) {
    super(props);
    console.log("show all on details: ", props.showAll)
    this.requestLotteryList();
  }

  requestLotteryList() {
    this.props.lotteryListRequest(this.props.showAll);
  }

  render() {
    console.log('Details Log: ',this.props)
    const lottery = this.props.lottery
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right lt-v-pad-8">
            <Button
              className="pt-minimal pt-small pt-intent-primary"
              onClick={()=>this.props.history.goBack()}>
              {"< back"}
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="pt-card">
              <div className="row"><div className="col-sm-4"><h3>{lottery && lottery.name}</h3></div></div>
              <div className="row" style={{ paddingTop: 8 }}><div className="col-sm-4"><strong>Tickets Count:</strong></div><div className="col-sm-8"><span>{lottery && lottery.ticketCount}</span></div></div>
              <div className="row" style={{ paddingTop: 15 }}><div className="col-sm-4"><strong>Price/Ticket:</strong></div><div className="col-sm-8"><span>{lottery && lottery.ticketPrice}</span></div></div>
              <div className="row" style={{ paddingTop: 15 }}><div className="col-sm-4"><strong>Winner Address:</strong></div><div className="col-sm-8"><span>{lottery && lottery.winnerAddress}</span></div></div>
              <div className="row" style={{ paddingTop: 15 }}><div className="col-sm-4"><strong>Tickets Sold:</strong></div><div className="col-sm-8"><span>{lottery && lottery.entries.length}</span></div></div>
              <div className="row" style={{ paddingTop: 15 }}><div className="col-sm-4"><strong>Tickets Left:</strong></div><div className="col-sm-8"><span>{lottery && (lottery.ticketCount - lottery.entries.length)}</span></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    lottery: getLotteryDetails(state, props.match.params.name),
    showAll: state.lotteryList.showAll
  }
}

const connected = connect(
  mapStateToProps,
  {
    lotteryListRequest,
  }
)(LotteryDetails);
export default withRouter(connected);
