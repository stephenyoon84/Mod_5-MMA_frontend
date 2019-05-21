import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class SmallGroups extends Component {
  render() {
    const thisYear = new Date().getFullYear()
    if (!localStorage.token){
      return <Redirect to='/' />
    } else {
      // debugger
      return (
        <div>
          <div>Small groups tables</div>
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
  groups: store.groups
})

export default connect(mapStateToProps)(SmallGroups);
