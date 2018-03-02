import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DialogContainer} from 'react-md';
import './LotteryDetails.css';

class LotteryDetails extends Component {

  render() {
    const actions = [{
      onClick: this.props.handleModal.bind(this, false),
      primary: true,
      children: 'Close',
    }];

    return (<DialogContainer
      id="lottery-detail-dialog"
      className="ht-play"
      visible={this.props.isOpen}
      actions={actions}
      onHide={this.props.handleModal.bind(this, false)}
      footerClassName="footer-lottery-detail"
      width={'40pc'}
      title={this.props.lotteryData.name}
    >
      <div className="lottery-detail">
        <p>
          {this.props.lotteryData.description}
        </p>
        <p> Jackpot: {this.props.lotteryData.ticketPrice * this.props.lotteryData.ticketCount} coins </p>
        <p> Ticket remaining: {this.props.lotteryData.ticketCount - this.props.lotteryData.entries.length} </p>
        <p> Price: {this.props.lotteryData.ticketPrice} coins per ticket </p>
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
