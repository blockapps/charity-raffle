import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import LotteryList from './components/LotteryList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://ethereumprice.org/wp-content/uploads/2017/08/ethereum-coins-435x200.jpg" className="App-logo" alt="logo" />
          <h1 className="App-title">Eth Lotto</h1>
        </header>
        <div>
          <LotteryList/>
        </div>
      </div>
    );
  }
}

export default App;
