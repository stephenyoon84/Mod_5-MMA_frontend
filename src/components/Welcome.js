import React, {Component} from 'react';

class Welcome extends Component {
  render() {
    if (!!localStorage.token) {
      return <div>Welcome name</div>
    } else {
      return <div>Welcome to UMC</div>
    }
  }
}

export default Welcome
