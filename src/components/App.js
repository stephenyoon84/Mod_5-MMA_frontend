import React, {Component} from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import '../App.css';
import Login from './Login';
import Navbar from './Navbar';
import NewMemberForm from './NewMemberForm';
import Members from './Members'
import SmallGroups from './SmallGroups'
import Welcome from './Welcome'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path='/newmember' component={NewMemberForm} />
          <Route path='/members' component={Members} />
          <Route path='/smallgroups' component={SmallGroups} />
        </Switch>
      </div>
    );
  }
}

export default App;
