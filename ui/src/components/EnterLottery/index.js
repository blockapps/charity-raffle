import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EnterLottery extends Component {
    render() {
        return (
                <div className="container">
                  <div className="row lt-v-">
                    <div className="col-sm-12">
                      <h3>Lottery successfully entered!</h3>
                    </div>
                    <Link to="/">
                        <button className="pt-button">Back</button>
                    </Link>
                  </div>
                </div>
        );
    }
}

export default EnterLottery;
