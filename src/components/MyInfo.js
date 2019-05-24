import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import {URL} from '../redux/actionCreators';

class MyInfo extends Component {
  render() {
    if (!!localStorage.token) {
      if (this.props.user) {
        return (
          <div>
            {this.props.user.user_type}
          </div>
        )
      } else {
        return <div>loading.....</div>
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps)(MyInfo)
