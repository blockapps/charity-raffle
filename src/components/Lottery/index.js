import React, { Component } from 'react';

import Participate from '../Participate/';
import { withRouter } from 'react-router-dom';
import { Card, CardTitle, CardText, Button } from 'react-md';
import './lottery.css';

class Lottery extends Component {

  render() {
    const isDisabled = (this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length) <= 0;

    return (
      <Card className="lottery" onClick={() => this.props.history.push(`/details/${this.props.lotteryData.address}`)}>
        <CardTitle title={this.props.lotteryData.name} className="lottery-title" />
        <CardText>
          <p> <b>Jackpot:</b> 10 coins </p>
          <p> <b>Ticket remaining:</b> {this.props.lotteryData.entries.length}/{this.props.lotteryData.ticketCount} </p>
          <p> <b>Charity:</b> 30% </p>
          <div className="md-text-center">
            <Button
              raised
              primary
              disabled={isDisabled}
              className={isDisabled ? 'lottery-disabled' : 'lottery-button'} > Play 0.012 coin </Button>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default withRouter(Lottery);
