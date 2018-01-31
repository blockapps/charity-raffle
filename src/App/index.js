import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';
import { routes as scenes } from '../routes';
import { Toolbar } from 'react-md';
import { appInitCompileContract } from './app.actions';
import Snackbar from 'react-md/lib/Snackbars';

import { resetUserMessage, setUserMessage } from '../components/UserMessage/user-message.action';

class App extends Component {

  componentWillMount() {
    this.props.appInitCompileContract();
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          colored
          title="CHARITY RAFFLE"
        />
        <Snackbar
          toasts={
            this.props.userMessage
              ? [{ text: this.props.userMessage.toString(), action: 'Dismiss' }]
              : []
          }
          onDismiss={() => { this.props.resetUserMessage() }} />
        {scenes}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userMessage: state.userMessage,
  };
}

const connected = connect(mapStateToProps, {
  appInitCompileContract,
  setUserMessage,
  resetUserMessage,
})(App);

export default withRouter(connected);
