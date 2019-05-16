import React, {Component} from 'react';

class SmallGroups extends Component {
  render() {
    return (
      <div>
        <div>Small groups tables</div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>gender</th>
              <th>age</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    )
  }
}

export default SmallGroups
