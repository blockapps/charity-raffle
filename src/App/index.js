import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {routes as scenes} from '../routes';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'bootstrap/dist/css/bootstrap.css';

import { appInitCompileContract } from './app.actions';

class App extends Component {

  componentWillMount() {
    this.props.appInitCompileContract();
  }

  render() {
    return (
      <div className="App">
        <nav className="pt-navbar" >
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Demo Lottery App</div>
          </div>
        </nav>
        <main>
          {scenes}
        </main>
      </div>
    );
  }
}

const connected = connect(
  () => { return {} }, // empty mapStateToProps
  {
    appInitCompileContract
  })(App);

export default connected;
