import React, { Component } from 'react';



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
      <li>
        <div>
          <span>Address: {lotteryData.address} </span>
          <span>Prize: {lotteryData.prize} </span>
          <span>Current: {lotteryData.current} </span>
        </div>
      </li>
    );
  }
}

export default Lottery;
