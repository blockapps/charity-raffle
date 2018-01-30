import React, { Component } from 'react';
import { DialogContainer, Button } from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  participateRequest,
  participateOpenModal,
  participateCloseModal
} from './participate.actions';
import './participate.css'
class Participate extends Component {

  handleOpenModal = (e) => {
    this.props.participateOpenModal(this.props.lookup);
  }

  handleCloseModal = (e) => {
    this.props.reset();
    this.props.participateCloseModal(this.props.lookup);
  }

  submit = (values) => {
    const payload = {
      username: values.modalUsername,
      userAddress: values.modalAddress,
      password: values.modalPassword,
      contractName: "Raffle",
      contractAddress: this.props.lotteryData.address,
      methodName: "enter",
      value: values.modalValue * this.props.lotteryData.ticketPrice * 1000000000000000000, //convert to ether
      args: {
        _numTickets: values.modalValue,
      },
    }
    this.props.participateRequest(this.props.lookup, payload);
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const error = this.props.failure &&
      (<div className="row">
        <div className="col-sm-12">
          <label className="pt-label" style={{ marginTop: '5px', color: 'red' }}>
            Failed to participate in lottery with error: {this.props.failure}
          </label>
        </div>
      </div>)

    const actions = [{
      onClick: this.handleCloseModal,
      primary: true,
      children: 'Close',
    },
    {
      onClick: handleSubmit(this.submit),
      disabled: this.props.pristine || this.props.submitting,
      primary: true,
      children: 'Play',
    }];

    return (
      <section className="participate">
        <Button
          raised
          primary
          onClick={this.handleOpenModal}
          disabled={this.props.isDisabled}
          className={this.props.isDisabled ? 'lottery-disabled' : 'lottery-button'} > Play {this.props.lotteryData.ticketPrice} coin </Button>
        <form>
          <DialogContainer
            id="participate-raffle"
            className="new-participate"
            visible={this.props.modal.isOpen || false}
            actions={actions}
            onHide={this.handleCloseModal}
            width={'40pc'}
            title={`${this.props.lotteryData.name} Raffel`}
          >
            <div className="lottery-participate">
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Username
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalUsername"
                  component="input"
                  placeholder="Username"
                  type="text"
                  disabled={user}
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Address
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component="input"
                  placeholder="Address"
                  type="text"
                  name="modalAddress"
                  disabled={user}
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Password
                  </label>
                </div>
                <Field
                  name="modalPassword"
                  className="md-cell md-cell--9"
                  placeholder="Password"
                  component="input"
                  type="password"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Number of Tickets
                  </label>
                </div>
                <Field
                  name="modalValue"
                  className="md-cell md-cell--9"
                  component="input"
                  placeholder="Number"
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Total
                  </label>
                </div>
                <Field
                  name="modalTotal"
                  className="md-cell md-cell--4"
                  component="input"
                  placeholder="Number"
                  type="number"
                  required
                />
              </div>
              {error}
            </div>
          </DialogContainer>
        </form>
      </section>
    );
  }
}

const selector = formValueSelector('participate');

function mapStateToProps(state, ownProps) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return {
    initialValues: { modalUsername: user && user.username, modalAddress: user && user.address },
    modal: state.participate.modals
      && state.participate.modals[ownProps.lookup] ?
      state.participate.modals[ownProps.lookup] : {},
    modalUsername: selector(state, 'modalUsername'),
    failure: state.participate.failure,
  };
}


const formed = reduxForm({ form: 'participate' })(Participate);
const connected = connect(
  mapStateToProps,
  {
    participateOpenModal,
    participateCloseModal,
    participateRequest,
  }
)(formed);
const routed = withRouter(connected);

export default routed;
