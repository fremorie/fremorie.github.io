// @flow

import React from 'react';
import {compose, withProps} from 'recompose';
import logo from './logo.svg';
import './App.css';
import css from './styles.css';
import Stack from './utils';

console.log({css});

type Props = {
  stack: string[],
};

const App = ({stack, ololo}: Props) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
      <div className={css.ololo}>{ololo}</div>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

const enhance = compose(
);

export default withProps(() => ({ololo: 'WOW!!!'}))(App);
