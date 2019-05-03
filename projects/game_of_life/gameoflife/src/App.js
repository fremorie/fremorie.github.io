import React, { Component } from 'react';
import Game from './Game';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Game />
      </div>
    );
  }
}

export default App;
