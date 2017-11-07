import React, { Component } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
  newLotteryCall,
  newLotteryOpenModal,
  newLotteryCloseModal
} from './newlottery.actions';

class NewLottery extends Component {

  handleOpenModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.newLotteryOpenModal();
  }

  handleCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
        _ticketCount: values.modalValue,
        _ticketPrice: values.modalTicketPrice
      }
    }
    this.props.newLotteryCall(payload);
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const error = this.props.failure  && 
                (<div className="row">
                  <div className="col-sm-12">
                    <label className="pt-label" style={{marginTop: '5px', color:'red'}}>
                      Failed to create lottery with error: {this.props.failure}
                    </label>
                  </div>
                </div>) 
    return (
      <div>
        <Button
          className="pt-small pt-intent-primary pt-intent-success"
          onClick={this.handleOpenModal}
        >
          Create new lottery
        </Button>
        <form>
          <Dialog
            iconName="exchange"
            isOpen={this.props.isOpen}
            onClose={this.handleCloseModal}
            title={"Create new lottery"}
          >
            <div className="pt-dialog-body">
              {error}
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '5px'}}>
                    Username
                  </label>
                </div>
                <div className="col-sm-9">
                    <Field
                      className="pt-input"
                      name="modalUsername"
                      component="input"
                      type="text"
                      required
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '9px'}}>
                    Address
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                    <Field
                      className="pt-input"
                      component="input"
                      type="text"
                      name="modalAddress"
                      required
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '9px'}}>
                    Password
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                  <Field
                    name="modalPassword"
                    className="pt-input"
                    placeholder="Password"
                    component="input"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '9px'}}>
                    Lottery Name
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                    <Field
                      className="pt-input"
                      component="input"
                      type="text"
                      name="modalName"
                      required
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '9px'}}>
                    Number of Tickets
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                  <div className="pt-form-group">
                    <div className="pt-form-content">
                      <Field
                        name="modalValue"
                        className="pt-input"
                        component="input"
                        type="number"
                        required
                      />
                      <div className="pt-form-helper-text">Must be > 1</div>  
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="pt-label" style={{marginTop: '9px'}}>
                    Ticket Price
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                  <Field
                    name="modalTicketPrice"
                    className="pt-input"
                    component="input"
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="pt-dialog-footer">
              <div className="pt-dialog-footer-actions">
                <Button text="Cancel" onClick={this.handleCloseModal} />
                <button
                  disabled={this.props.pristine || this.props.submitting || !this.props.valid}
                  className="pt-button pt-intent-primary"
                  type="button"
                  onClick={handleSubmit(this.submit)}
                >
                Create
                </button>
              </div>
            </div>
          </Dialog>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isOpen: state.newLottery.isOpen,
    failure: state.newLottery.failure,
    modalUsername: '',
  };
}

function validate (values) {
  const errors = {};
  if (values.modalValue < 2) {
    errors.modalValue = "Must have more than 1 ticket in lottery";
  }
  return errors;

}

const formed = reduxForm({ form: 'newLottery' , validate})(NewLottery);
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
