import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react'

const typeOptions = [
  {key: 'new_user', text: 'new_user', value: 'new_user'},
  {key: 'team', text: 'team', value: 'team'},
  {key: 'team_leader', text: 'team_leader', value: 'team_leader'},
  {key: 'group_leader', text: 'group_leader', value: 'group_leader'},
  {key: 'admin', text: 'admin', value: 'admin'}
]

class Users extends Component {
  render(){
    if (this.props.user && this.props.user.user_type === 'admin'){
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>Type</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(u => {
                // debugger
                return (
                  <tr key={u.id}>
                    <th name='name'>{u.name}</th>
                    <th name='email'>{u.email}</th>
                    <th name='type'>{<Dropdown fluid onChange={(e)=> {
                        debugger
                        console.log(e)
                      } } options={typeOptions} defaultValue={u.user_type}/>}</th>
                    <th name='updated'>{new Date(u.updated_at).toLocaleDateString()}</th>
                  </tr>)
                  })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user,
  users: store.users
})

export default connect(mapStateToProps)(Users)
