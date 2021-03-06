import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import '../App.css';
import Login from './Login';
import Navbar from './Navbar';
import NewMemberForm from './NewMemberForm';
import Members from './Members'
import Welcome from './Welcome'
import Signup from './Signup'
import SmallGroupList from './SmallGroupList'
import Users from './Users'
import MyInfo from './MyInfo'
import {URL, loginUser, fetchingMembers, fetchingGroups, fetchingUsers} from '../redux/actionCreators'

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
      if (this.props.user.user_type === 'admin'){
        this.props.fetchingUsers()
      }
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
          <Route path='/signup' component={Signup} />
          <Route path='/smallgroups' component={SmallGroupList} />
          <Route path='/users' component={Users} />
          <Route path='/myinfo' component={MyInfo} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, {loginUser, fetchingMembers, fetchingGroups, fetchingUsers})(App);
