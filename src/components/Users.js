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
            // debugger
            return <div key={u.id}>{u.name} - {u.user_type} - Updated: {new Date(u.updated_at).toLocaleDateString()}</div>
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
