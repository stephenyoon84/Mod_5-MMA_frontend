import React, {Component} from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import '../App.css';
import Login from './Login';
import Navbar from './Navbar';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
