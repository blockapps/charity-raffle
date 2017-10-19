import React, { Component } from 'react';
import Lottery from '../Lottery';

class LotteryList extends Component {
  render() {
    // TODO :: get lotteryData from sagas
    // const allLotteryData = undefined;
    const allLotteryData = [
      // TODO :: get lotteryData from this.props
      // const lotteryData = undefined;
      {
        address:"0xdeadbeef",
        prize:100000,
        current:95638,
        name:"Lottery 1",
      },
      {
        address:"0x123456789abcdef",
        prize:10000000,
        current:0,
        name:"Lottery 2",
      },      
      {
        address:"0x07041776",
        prize:538,
        current:270,
        name:"The Electoral College",
      },
    ];

    const lotteries = allLotteryData.map((item, i) =>{
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

export default LotteryList;
