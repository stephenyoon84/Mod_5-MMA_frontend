import React, {Component} from 'react';
import {connect} from 'react-redux';

class Welcome extends Component {
  render() {
    if (this.props.user !== null) {
      return <h1>Welcome {this.props.user.name}</h1>
    } else {
      return <h1>Welcome to UMC</h1>
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps)(Welcome)
