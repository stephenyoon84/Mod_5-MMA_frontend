import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Members extends Component {
  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />
    } else {
      return (
        <table>
          <thead>
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
          </thead>
          <tbody>
            {
              this.props.members.map((member) => {
                return (
                  <tr key={member.id}>
                    <th>{member.register_date}</th>
                    <th>{member.name}</th>
                    <th>{member.email}</th>
                    <th>{member.phone_number}</th>
                    <th>{member.gender}</th>
                    <th>{member.dob}</th>
                    <th>{member.active ? "Yes" : "No"}</th>
                    <th>{member.info}</th>
                    <th>{member.welcome_mail ? "Yes" : "Not yet"}</th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    }
  }
}

const mapStateToProps = (store) => ({
  members: store.members
})

export default connect(mapStateToProps)(Members);
