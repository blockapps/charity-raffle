import React, { Component } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  methodCall,
  methodCallOpenModal,
  methodCallCloseModal
} from './participate.actions';

class Participate extends Component {

  handleOpenModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.methodCallOpenModal(this.props.lookup);
  }

  handleCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.reset();
    this.props.methodCallCloseModal(this.props.lookup);
  }
 
  submit = (values) => {
    const payload = {
      contractName: this.props.contractName,
      contractAddress: this.props.contractAddress,
      methodName: this.props.symbolName,
      username: values.modalUsername,
      userAddress: values.modalAddress,
      password: values.modalPassword,
      value: values.modalValue,
    }
    this.props.methodCall(payload);
  }

  render() {
    const handleSubmit = this.props.handleSubmit;

    return (
      <div>
        <Button
          className="pt-minimal pt-small pt-intent-primary"
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
            className="pt-dark"
          >
            <div className="pt-dialog-body">
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
                    Number of Tickets
                  </label>
                </div>
                <div className="col-sm-9 smd-pad-4">
                  <Field
                    name="modalValue"
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
    modalUsername: selector(state, 'modalUsername')
  };
}


const formed = reduxForm({ form: 'participate' })(Participate);
const connected = connect(
  mapStateToProps,
  {
    methodCallOpenModal,
    methodCallCloseModal,
    methodCall,
  }
)(formed);
const routed = withRouter(connected);

export default routed;
