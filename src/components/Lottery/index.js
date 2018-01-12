import React, { Component } from 'react';

import Participate from '../Participate/';
import { withRouter, Link } from 'react-router-dom';

class Lottery extends Component {

  render() {
    return (
      <tr className="border-below lt-v-pad-10">
        <td data-th="Name">
          <Link
            className="pt-minimal pt-small pt-intent-primary"
            to={`/details/${this.props.lotteryData.address}`}>
            {this.props.lotteryData.name}
          </Link>
        </td>
        <td data-th="Prize Amount">
          <span>{this.props.lotteryData.ticketCount * this.props.lotteryData.ticketPrice} </span>
        </td>
        <td data-th="Tickets Sold">
          <span>{this.props.lotteryData.entries.length} </span>
        </td>
        <td data-th="Tickets Left">
          <span>{this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length} </span>
        </td>
        <td data-th="Price">
          <span>{this.props.lotteryData.ticketPrice} </span>
        </td>
        <td data-th="Action">
         {((this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length)<=0)? 'Completed':<Participate
            key={'participate' + this.props.lotteryData.address}
            lookup={'participate' + this.props.lotteryData.address}
            contractName={this.props.lotteryData.name}
            contractAddress={this.props.lotteryData.address}
            lotteryData={this.props.lotteryData}
          />}
        </td>
      </tr>
    );
  }
}

export default withRouter(Lottery);
