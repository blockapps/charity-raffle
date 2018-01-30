import React, { Component } from 'react';
import { Button, DialogContainer } from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import ReduxedTextField from '../../components/ReduxedTextField';
import {
  newLotteryCall,
  newLotteryOpenModal,
  newLotteryCloseModal
} from './newlottery.actions';
import './newLottery.css';

class NewLottery extends Component {

  handleOpenModal = (e) => {
    this.props.reset();
    this.props.newLotteryOpenModal();
  }

  handleCloseModal = (e) => {
    this.props.reset();
    this.props.newLotteryCloseModal();
  }

  submit = (values) => {
    const payload = {
      admin: values.modalUsername,
      username: values.modalUsername,
      address: values.modalAddress,
      password: values.modalPassword,
      args: {
        _name: values.modalName,
        _description: values.modalRafalInfo,
        _ticketCount: values.modalValue,
        _ticketPrice: values.modalTicketPrice,
        _charityPercentage: values.modalCharity
      }
    }
    this.props.newLotteryCall(payload);
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const actions = [{
      onClick: this.handleCloseModal,
      primary: true,
      children: 'Close',
    },
    {
      onClick: handleSubmit(this.submit),
      primary: true,
      children: 'Submit',
    }];

    const error = this.props.failure &&
      (<div className="md-cell md-cell--12">
        <label style={{ marginTop: '5px', color: 'red' }}>
          Failed to create raffle with error: {JSON.stringify(this.props.failure)}
        </label>
      </div>)

    return (
      <section className="new-lottery-modal">
        <Button raised primary onClick={this.handleOpenModal} className="open-modal">
          Create New Raffle
        </Button>
        <form>
          <DialogContainer
            id="simple-new-raffle"
            className="new-raffle"
            visible={this.props.isOpen}
            actions={actions}
            onHide={this.handleCloseModal}
            width={'40pc'}
            title={"Create new lottery"}
          >
            <div className="lottery-detail">
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Username
                  </label>
                </div>
                <Field
                  name="modalUsername"
                  id="modalUsername"
                  placeholder="Username"
                  component={ReduxedTextField}
                  type="text"
                  disabled={Boolean(user)}
                  className="md-cell md-cell--9"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Address
                  </label>
                </div>
                <Field
                  component={ReduxedTextField}
                  className="md-cell md-cell--9"
                  placeholder="Address"
                  type="text"
                  name="modalAddress"
                  disabled={Boolean(user)}
                  id="modalAddress"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Password
                  </label>
                </div>
                <Field
                  name="modalPassword"
                  id="modalPassword"
                  className="md-cell md-cell--9"
                  placeholder="Password"
                  component={ReduxedTextField}
                  type="password"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Raffle Name
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component={ReduxedTextField}
                  type="text"
                  placeholder="Lottery Name"
                  name="modalName"
                  id="modalName"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Raffle Info
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component={ReduxedTextField}
                  type="text"
                  placeholder="Lottery Name"
                  name="modalRafalInfo"
                  id="modalRafalInfo"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Number of Tickets
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalValue"
                  id="modalValue"
                  component={ReduxedTextField}
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Ticket Price
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalTicketPrice"
                  id="modalTicketPrice"
                  component={ReduxedTextField}
                  placeholder="Price"
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3 label-form">
                  <label>
                    Charity %
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalCharity"
                  id="modalCharity"
                  component={ReduxedTextField}
                  placeholder="Price"
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


function mapStateToProps(state) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return {
    initialValues: { modalUsername: user && user.username, modalAddress: user && user.address },
    isOpen: state.newLottery.isOpen,
    failure: state.newLottery.failure,
    modalUsername: '',
  };
}

function validate(values) {
  const errors = {};

  if (!values.modalUsername) {
    errors.modalUsername = "Username Required";
  }
  if (!values.modalAddress) {
    errors.modalAddress = "Address Required";
  }
  if (!values.modalPassword) {
    errors.modalPassword = "Password Required";
  }
  if (!values.modalName) {
    errors.modalName = "Name required";
  }
  if (!/^.{9,59}$/.test(values.modalName)) {
    errors.modalName = " Raffle name must be at least 10 characters and less than 60 characters";
  }
  if (!values.modalRafalInfo) {
    errors.modalRafalInfo = "Rafal info required";
  }
  if (!/^.{9,59}$/.test(values.modalRafalInfo)) {
    errors.modalRafalInfo = " Raffle description must be at least 10 characters and less than 60 characters";
  }
  if (!values.modalTicketPrice) {
    errors.modalTicketPrice = "Ticket price required";
  }
  if (!/^.{1,10}$/.test(values.modalTicketPrice)) {
    errors.modalTicketPrice = "Ticket price must be at least 1 characters and less than 10 characters";
  }
  if (!values.modalCharity) {
    errors.modalCharity = "Charity Required";
  }
  if (!(/^.{1,10}$/.test(values.modalCharity))) {
    errors.modalCharity = "Less than 10 characters";
  }
  if (!values.modalValue) {
    errors.modalValue = "Tickets Required";
  }
  if (values.modalValue < 2) {
    errors.modalValue = "Must have more than 1 ticket in lottery";
  }

  return errors;
}

const formed = reduxForm({ form: 'newLottery', validate })(NewLottery);
const connected = connect(
  mapStateToProps,
  {
    newLotteryOpenModal,
    newLotteryCloseModal,
    newLotteryCall,
  }
)(formed);
const routed = withRouter(connected);

export default routed;
