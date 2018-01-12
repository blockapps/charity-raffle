import React, { Component } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
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
    e.stopPropagation();
    e.preventDefault();
    this.props.participateOpenModal(this.props.lookup);
  }

  handleCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.reset();
    this.props.participateCloseModal(this.props.lookup);
  }

  submit = (values) => {
    const payload = {
      username: values.modalUsername,
      userAddress: values.modalAddress,
      password: values.modalPassword,
      contractName: "Lottery",
      contractAddress: this.props.contractAddress,
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
    const error = this.props.failure  &&
                (<div className="row">
                  <div className="col-sm-12">
                    <label className="pt-label" style={{marginTop: '5px', color:'red'}}>
                      Failed to participate in lottery with error: {this.props.failure}
                    </label>
                  </div>
                </div>)

    return (
      <div className="participate">
        <Button
          className="pt-minimal pt-small pt-intent-primary participate-button"
          onClick={this.handleOpenModal}
        >
          Participate
        </Button>
        <form>
          <Dialog
            iconName="exchange"
            isOpen={this.props.modal.isOpen}
            onClose={this.handleCloseModal}
            title={"Enter " + this.props.contractName}
            className="custom-dialog"
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
                      placeholder="Username"
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
                      placeholder="Address"
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
                    Number of Tickets
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                  <Field
                    name="modalValue"
                    className="pt-input"
                    component="input"
                    placeholder="Number"
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
                  disabled={this.props.pristine || this.props.submitting}
                  className="pt-button pt-intent-primary"
                  type="button"
                  onClick={handleSubmit(this.submit)}
                >
                  Enter Lottery
                </button>
              </div>
            </div>
          </Dialog>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('participate');

function mapStateToProps(state,ownProps) {
  return {
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
