import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class SmallGroups extends Component {
  render() {
    // debugger
    const thisYear = new Date().getFullYear()
    if (!localStorage.token){
      return <Redirect to='/' />
    } else {
      // debugger
      return (
        <div>
          {
            this.props.user && this.props.user.user_type === 'admin' ? (
              <button>Create New Group</button>
            ) : (
              null
            )
          }
          <div>
            {this.props.groups.map((group) => {
              return (
                <table key={group.id}>
                  <thead>
                    <tr>
                      <th>
                        {group.name} - {group.year}
                      </th>
                    </tr>
                    <tr>
                      <th>name</th>
                      <th>gender</th>
                      <th>age</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr bgcolor="yellow">
                      <td>{group.leader.leader_name}</td>
                      <td>{group.leader.leader_gender}</td>
                      <td>{thisYear - parseInt(group.leader.leader_dob.split('-')[0])}</td>
                    </tr>
                    {
                      group.allmembers.map((member) => {
                        return (
                          <tr key={member.email}>
                            <td>{member.name}</td>
                            <td>{member.gender}</td>
                            <td>{thisYear - parseInt(member.dob.split('-')[0])}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (store) => ({
  groups: store.groups,
  user: store.user
})

export default connect(mapStateToProps)(SmallGroups);
