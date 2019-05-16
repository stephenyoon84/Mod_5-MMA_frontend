import React, {Component} from 'react';

class SmallGroups extends Component {
  render() {
    return (
      <div>
        <div>Small groups tables</div>
        <table>
          <tr>
            <th>name</th>
            <th>gender</th>
            <th>age</th>
          </tr>
          <tr>
            <td>aa</td>
            <td>M</td>
            <td>35</td>
          </tr>
          <tr>
            <td>bb</td>
            <td>F</td>
            <td>31</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default SmallGroups
