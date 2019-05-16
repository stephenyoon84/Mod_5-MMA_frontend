import React, {Component} from 'react';

class Members extends Component {
  render() {
    return (
      <div>
        <div>All members will be shown here (fetch members & users)</div>
        <table>
          <tr>
            <th>Date</th>
            <th>name</th>
            <th>email</th>
            <th>Phone</th>
            <th>gender</th>
            <th>DOB</th>
            <th>Active?</th>
            <th>Info</th>
            <th>Welcome email?</th>
          </tr>
          <tr>
            <th>May 16, 2019</th>
            <th>AA</th>
            <th>aa@aa.com</th>
            <th>1111111111</th>
            <th>M</th>
            <th>March 31, 1984</th>
            <th>Yes</th>
            <th>Came with BB</th>
            <th>Not yet</th>
          </tr>
          <tr>
            <th>May 16, 2019</th>
            <th>BB</th>
            <th>bb@bb.com</th>
            <th>1231231234</th>
            <th>F</th>
            <th>May 2, 1988</th>
            <th>Yes</th>
            <th>Came with AA</th>
            <th>Not yet</th>
          </tr>
        </table>
      </div>
    )
  }
}

export default Members
