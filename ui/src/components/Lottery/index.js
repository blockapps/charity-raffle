import React, { Component } from 'react';

import Participate from '../Participate/';

class Lottery extends Component {
  name= "Lottery";
  symbol= "enter_or_something";

  render() {
    // TODO :: get lotteryData from this.props
    // const lotteryData = undefined;
    const lotteryData = {
      address:"0xdeadbeef",
      prize:100000,
      current:95638,
    };
    return (
      <div className="row lt-v-pad-8">
        <div className="col-sm-3">
          <span>{lotteryData.address}</span>
        </div>
        <div className="col-sm-3">
          <span>{lotteryData.prize} </span>
        </div>
        <div className="col-sm-3">
          <span>{lotteryData.current} </span>
        </div>
        <div className="col-sm-3">
          <Participate
            contractName={this.name}
            contractAddress={lotteryData.address}
            symbolName={this.symbol}
          />
        </div>
      </div>
    );
  }
}

export default Lottery;
