import React, {Component} from 'react';

class Members extends Component {
  render() {
    return (
      <div>
        <div>All members will be shown here (fetch members & users)</div>
        <table>
          <tr>
            <th>name</th>
            <th>gender</th>
            <th>age</th>
            <th>email</th>
          </tr>
          <tr>
            <td>aa</td>
            <td>M</td>
            <td>30</td>
          </tr>
          <tr>
            <td>bb</td>
            <td>F</td>
            <td>26</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Members
