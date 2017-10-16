import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewLottery extends Component {
  render() {
    return (
      <div className="container">
        <div className="row lt-v-pad-8">
          <div className="col-sm-12">
            <div className="pt-card">
                <h3> Enter lottery details </h3>
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
                  <input type="text" value="100" />
                </div>
                <div>
                  Ticket price
                  <input type="text" value="1" />
                </div>
                <Link to="/post-lottery">
                  <button className="pt-button">Create Lottery</button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewLottery;
