import React, { Component } from 'react';
import Lottery from '../Lottery';

class LotteryList extends Component {
  render() {
    // TODO :: get lotteryData from sagas
    // const allLotteryData = undefined;
    const allLotteryData = [undefined];

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
            <strong>Address</strong>
          </div>
          <div className="col-sm-3">
            <strong>Prize </strong>
          </div>
          <div className="col-sm-3">
            <strong>In progress </strong>
          </div>
        </div>
        {lotteries}
      </div>
    );
  }
}

export default LotteryList;
