import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import '../App.css';
import Login from './Login';
import Navbar from './Navbar';
import NewMemberForm from './NewMemberForm';
import Members from './Members'
import SmallGroups from './SmallGroups'
import Welcome from './Welcome'
import Signup from './Signup'
import {URL, loginUser, fetchingMembers, fetchingGroups} from '../redux/actionCreators'

class App extends Component {

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (!!localStorage.token){
      fetch(URL+'/current_user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(this.handleResponse)
    }
  }

  handleResponse = json => {
    if (json["success"]) {
      this.props.loginUser(json["user"])
      this.props.fetchingMembers()
      this.props.fetchingGroups()
    } else {
      console.log("Error")
    }
  }

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
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, {loginUser, fetchingMembers, fetchingGroups})(App);
