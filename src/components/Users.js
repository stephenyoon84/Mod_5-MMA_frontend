import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Users extends Component {
  render(){
    if (this.props.user && this.props.user.user_type === 'admin'){
      return (
        <div>display all users and manage user type</div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps)(Users)
