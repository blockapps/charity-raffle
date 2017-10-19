import React, { Component } from 'react';
import './App.css';
import {routes as scenes} from '../routes';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="pt-navbar" >
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Richie Rich</div>
          </div>
        </nav>
        <main>
          {scenes}
        </main>
      </div>
    );
  }
}

export default App;
