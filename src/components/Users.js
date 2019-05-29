import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Users extends Component {
  render(){
    if (this.props.user && this.props.user.user_type === 'admin'){
      return (
        <div>
          <div>display all users and manage user type</div>
          {this.props.users.map(u => {
            return <div>{u.email}</div>
          })}
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user,
  users: store.users
})

export default connect(mapStateToProps)(Users)
