import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react';

class SmallGroups extends Component {
  render() {
    // debugger
    const thisYear = new Date().getFullYear()
    if (!localStorage.token){
      return <Redirect to='/' />
    } else {
      let targetGroup = this.props.groups.filter(g => g.year === this.props.targetYear)
      return (
        <div>
          <Grid container columns={5}>
            {targetGroup.map((group) => {
              return (
                <Grid.Column key={group.id}>
                  <table className='smallgroup'>
                    <thead>
                      <tr>
                        <th>
                          {group.name}
                        </th>
                      </tr>
                      <tr>
                        <th>name</th>
                        <th>gender</th>
                        <th>age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='leader'>
                        <td>{group.leader.leader_name}</td>
                        <td>{group.leader.leader_gender}</td>
                        <td>{group.leader.leader_dob === null ? (0) : (thisYear - parseInt(group.leader.leader_dob.split('-')[0]))}</td>
                      </tr>
                      {
                        group.allmembers.filter(m => m.active).map((member) => {
                          return (
                            <tr key={member.email} className={!!member.user_type ? 'user' : null}>
                              <td>{member.name}</td>
                              <td>{member.gender}</td>
                              <td>{member.dob === null ? (0) : (thisYear - parseInt(member.dob.split('-')[0]))}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </Grid.Column>
              )
            })}
          </Grid>
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
