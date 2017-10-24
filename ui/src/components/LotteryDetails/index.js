import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getLotteryDetails} from './selectors';

class LotteryDetails extends Component {
  render() {
      const lottery = this.props.lottery
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
           <h4> {lottery && lottery.name} </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="pt-card">
              <div className="row" style={{paddingTop:8}}><div className="col-sm-4">Ticket Count:</div><div className="col-sm-8"> {lottery && lottery.ticketCount}</div></div>
              <div className="row" style={{paddingTop:8}}><div className="col-sm-4">Ticket Price:</div><div className="col-sm-8"> {lottery && lottery.ticketPrice}</div></div>
              <div className="row" style={{paddingTop:8}}><div className="col-sm-4">Winner Address:</div><div className="col-sm-8"> {lottery && lottery.winnerAddress}</div></div>
              <div className="row" style={{paddingTop:8}}><div className="col-sm-4">Ticket Sold:</div><div className="col-sm-8"> {lottery && lottery.entries.length}</div></div>
              <div className="row" style={{paddingTop:8}}><div className="col-sm-4">Ticket Left:</div><div className="col-sm-8"> {lottery && (lottery.ticketCount - lottery.entries.length)}</div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
    return {
      lottery: getLotteryDetails(state, props.match.params.name)
    }
  }

  const connected = connect(
    mapStateToProps,null
  )(LotteryDetails);
export default withRouter(connected);
