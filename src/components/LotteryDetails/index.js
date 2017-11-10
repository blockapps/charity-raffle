import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from '@blueprintjs/core';

class LotteryDetails extends Component {

  render() {

    const filtered = this.props.lotteries.filter((l) => {
      return l.address === this.props.address
    });

    if(filtered.length === 0) {
      return (
        <div className="row">
          <div className="col-12 text-center">
            <h4>Unable to find lottery with address {this.props.address}</h4>
          </div>
        </div>
      )
    }

    const lottery = filtered[0];

    const progressPercent = lottery.entries.length * 100 / lottery.ticketCount;
    const hasWinner = (lottery.ticketCount - lottery.entries.length) === 0;
    return (<div className="container">
      <div className="row">
        <div className="col-sm-12 text-right lt-v-pad-8">
          <Button className="pt-minimal pt-small pt-intent-primary" onClick={() => this.props.history.goBack()}>
            Back
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="pt-card">
            <div className="row">
              <div className="col-sm-4">
                <h3>{lottery && lottery.name}</h3>
              </div>
            </div>
            <div className="row" style={{
                paddingTop: 8
              }}>
              <div className="col-sm-4">
                <strong>Progress:</strong>
              </div>
              <div className="col-sm-8">
                <div className="pt-progress-bar pt-intent-success modifier pt-no-stripes">
                  <div className="pt-progress-meter" style={{
                      width: `${progressPercent}%`
                    }}></div>
                </div>
              </div>
            </div>
            <div className="row" style={{
                paddingTop: 15
              }}>
              <div className="col-sm-4">
                <strong>Tickets Count:</strong>
              </div>
              <div className="col-sm-8">
                <span>{lottery && lottery.ticketCount}</span>
              </div>
            </div>
            <div className="row" style={{
                paddingTop: 15
              }}>
              <div className="col-sm-4">
                <strong>Price/Ticket:</strong>
              </div>
              <div className="col-sm-8">
                <span>{lottery && lottery.ticketPrice}</span>
              </div>
            </div>
            {
              hasWinner && <div className="row" style={{
                    paddingTop: 15
                  }}>
                  <div className="col-sm-4">
                    <strong>Winner Address:</strong>
                  </div>
                  <div className="col-sm-8">
                    <span>{lottery && lottery.winnerAddress}</span>
                  </div>
                </div>
            }
            <div className="row" style={{
                paddingTop: 15
              }}>
              <div className="col-sm-4">
                <strong>Tickets Sold:</strong>
              </div>
              <div className="col-sm-8">
                <span>{lottery && lottery.entries.length}</span>
              </div>
            </div>
            <div className="row" style={{
                paddingTop: 15
              }}>
              <div className="col-sm-4">
                <strong>Tickets Left:</strong>
              </div>
              <div className="col-sm-8">
                <span>{lottery && (lottery.ticketCount - lottery.entries.length)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state, props) => {
  return {
    lotteries: state.lotteryList.lotteries,
    address: props.match.params.address
  };
}

const connected = connect(mapStateToProps)(LotteryDetails);

export default withRouter(connected);
