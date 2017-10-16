import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Lottery extends Component {
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
          <Link to={'/participate/' + lotteryData.address}>
            <button className="pt-button pt-small">Participate</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Lottery;
