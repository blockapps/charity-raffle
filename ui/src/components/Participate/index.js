import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Participate extends Component {
  render() {
    // TODO :: get lotteryData from this.props
    // const lotteryData = undefined;
    const lotteryData = {
      address:"0xdeadbeef",
      prize:100000,
      current:95638,
    };
    return (
      <div className="container">
        <div className="row lt-v-pad-8">
          <div className="col-sm-12">
            <div className="pt-card">
              <h3> Contribute ether to participate </h3>
              <div>
                Username
                <input type="text" value="Bob" />
              </div>
              <div>
                Password
                <input type="text" value="password" />
              </div>
              <div>
                Number of tickets
                <input type="text" value="1" />
              </div>
              <Link to={'/enter-lottery/' + lotteryData.address}>
                <button className="pt-button">Enter Lottery</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Participate;
