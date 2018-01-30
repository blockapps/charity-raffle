import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DialogContainer, Button, FontIcon } from 'react-md';
import './LotteryDetails.css';

class LotteryDetails extends Component {

  render() {
    const actions = [{
      onClick: this.props.handleModal.bind(this, false),
      primary: true,
      children: 'Close',
    },
    {
      onClick: this.props.handleModal.bind(this, false),
      primary: true,
      children: 'Play 0.1ETH',
    }];

    return (<DialogContainer
      id="lottery-detail-dialog"
      className="ht-play"
      visible={this.props.isOpen}
      actions={actions}
      onHide={this.props.handleModal.bind(this, false)}
      width={'40pc'}
      title={this.props.lotteryData.name}
    >
      <div className="lottery-detail">
        <p>
          <Button raised primary>
            Overview
          </Button>
        </p>
        <p>
          {this.props.lotteryData.description}
        </p>
        <p> Jackpot: {this.props.lotteryData.ticketPrice * this.props.lotteryData.ticketCount} coins </p>
        <p> Ticket remaining: {this.props.lotteryData.entries.length}/{this.props.lotteryData.ticketCount} </p>
        <p> price: {this.props.lotteryData.ticketPrice} </p>
        <p>
          Invite your friends:
          <FontIcon iconClassName="fa fa-whatsapp" />
          <FontIcon iconClassName="fa fa-facebook-official" />
          <FontIcon iconClassName="fa fa-twitter" />
        </p>
      </div>
    </DialogContainer>);
  }
}

const mapStateToProps = (state, props) => {
  return {
    lotteries: state.lotteryList.lotteries,
    address: props.match.params.address
  };
}

const connected = connect(mapStateToProps)(LotteryDetails);

export default withRouter(connected);
