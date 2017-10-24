import React, { Component } from 'react';

import Participate from '../Participate/';
import { Link } from 'react-router-dom';

class Lottery extends Component {

  render() {
    return (
      <div className="row lt-v-pad-8">
        <div className="col-sm-3">
          <Link
            className="pt-minimal pt-small pt-intent-primary"
            to={`/details/${this.props.lotteryData.name}`}>
            {this.props.lotteryData.name}
          </Link>
        </div>
        <div className="col-sm-3">
          <span>{this.props.lotteryData.ticketCount * this.props.lotteryData.ticketPrice} </span>
        </div>
        <div className="col-sm-3">
          <span>{this.props.lotteryData.entries.length} </span>
        </div>
        <div className="col-sm-3">
          <Participate
            key={'participate' + this.props.lotteryData.address}
            lookup={'participate' + this.props.lotteryData.address}
            contractName={this.props.lotteryData.name}
            contractAddress={this.props.lotteryData.address}
            lotteryData={this.props.lotteryData}
          />
        </div>
      </div>
    );
  }
}

export default Lottery;
