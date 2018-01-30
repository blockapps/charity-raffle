import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.css';
import { routes as scenes } from '../routes';
import { Toolbar } from 'react-md';
import { appInitCompileContract } from './app.actions';
import LoadingBar from 'react-redux-loading-bar';

class App extends Component {

  componentWillMount() {
    this.props.appInitCompileContract();
  }
  
  render() {
    return (
      <div className="App">
        <LoadingBar style={{display: 'block', position: 'fixed', top: '0px', backgroundColor: '#AC1049', zIndex: 999, height: '4px'}} />
        <Toolbar
          colored
          title="CHARITY RAFFLE"
        />
        {scenes}
      </div>
    );
  }
}

const connected = connect(
  () => { return {} }, // empty mapStateToProps
  {
    appInitCompileContract
  })(App);

export default withRouter(connected);
