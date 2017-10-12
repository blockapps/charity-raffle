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
      <div>
        <ul>
          {lotteries}
        </ul>
      </div>
    );
  }
}

export default LotteryList;
