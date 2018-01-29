import React, { Component } from 'react';
import { Button, DialogContainer } from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
  newLotteryCall,
  newLotteryOpenModal,
  newLotteryCloseModal
} from './newlottery.actions';
import './newLottery.css';

class NewLottery extends Component {

  handleOpenModal = (e) => {
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
          Failed to create lottery with error: {JSON.stringify(this.props.failure)}
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
                <div className="md-cell md-cell--3">
                  <label>
                    Username
                  </label>
                </div>
                <Field
                  name="modalUsername"
                  placeholder="Username"
                  component="input"
                  type="text"
                  className="md-cell md-cell--9"
                  disabled={user}
                  value="one"
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
                  component="input"
                  className="md-cell md-cell--9"
                  placeholder="Address"
                  type="text"
                  disabled={user}
                  name="modalAddress"
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
                    Raffle Name
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component="input"
                  type="text"
                  placeholder="Lottery Name"
                  name="modalName"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Raffle Info
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  component="input"
                  type="text"
                  placeholder="Lottery Name"
                  name="modalRafalInfo"
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
                  className="md-cell md-cell--9"
                  name="modalValue"
                  component="input"
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Ticket Price
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalTicketPrice"
                  component="input"
                  placeholder="Price"
                  type="number"
                  required
                />
              </div>
              <div className="md-grid">
                <div className="md-cell md-cell--3">
                  <label>
                    Charity %
                  </label>
                </div>
                <Field
                  className="md-cell md-cell--9"
                  name="modalCharity"
                  component="input"
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
