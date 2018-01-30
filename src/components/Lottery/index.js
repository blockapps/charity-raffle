import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { Card, CardTitle, CardText } from 'react-md';
import LotteryDetails from '../LotteryDetails';
import Participate from '../Participate';
import { participateOpenModal } from '../Participate/participate.actions';
import './lottery.css';

class Lottery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isParticipateOpen: false
    }
  }

  handleModal(isOpen) {
    this.setState({ isOpen });
  }

  handleParticipateModal(isParticipateOpen) {
    this.setState({ isParticipateOpen });
  }

  render() {
    const isDisabled = (this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length) <= 0;

    return (
      <div>
        <Card className="lottery">
          <CardTitle title={this.props.lotteryData.name} className="lottery-title" onClick={this.handleModal.bind(this, true)} />
          <CardText>
            <p> <b>Jackpot:</b> 10 coins </p>
            <p> <b>Ticket remaining:</b> {this.props.lotteryData.entries.length}/{this.props.lotteryData.ticketCount} </p>
            <p> <b>Charity:</b> {this.props.lotteryData.charityPercentage}% </p>
            <div>
              <Participate isDisabled={isDisabled} lotteryData={this.props.lotteryData} lookup={`participate` + this.props.lotteryData.address} />
            </div>
          </CardText>
        </Card>
        <LotteryDetails isOpen={this.state.isOpen} handleModal={this.handleModal.bind(this)} lotteryData={this.props.lotteryData} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

const connected = connect(
  mapStateToProps,
  {
    participateOpenModal
  }
)(Lottery);

export default withRouter(connected);
