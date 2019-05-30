import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
import {URL, activeOptions, welcomeMailOptions, fetchingMembers} from '../redux/actionCreators'

class Members extends Component {
  activeChange = (e, target) => {
    let token = localStorage.getItem('token')
    let new_active = e.target.innerText === 'Yes'
    let active = {active: new_active}
    fetch(URL + `/members/${target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        member: active
      })
    })
      .then(r => r.json())
      .then(this.props.fetchingMembers)
  }

  welcomeChange = (e, target) => {
    let token = localStorage.getItem('token')
    let mail_sent = e.target.innerText === 'Yes'
    let welcome = {welcome_mail: mail_sent}
    fetch(URL + `/members/${target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        member: welcome
      })
    })
      .then(r => r.json())
      .then(this.props.fetchingMembers)
  }

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
                  <tr key={member.email}>
                    <th>{member.register_date}</th>
                    <th>{member.name}</th>
                    <th>{member.email}</th>
                    <th>{member.phone_number}</th>
                    <th>{member.gender}</th>
                    <th>{member.dob}</th>
                    {/*<th>{member.active ? "Yes" : "No"}</th>*/}
                    <th>{<Dropdown fluid options={activeOptions} defaultValue={member.active} onChange={e => this.activeChange(e, member)}/>}</th>
                    <th>{member.info}</th>
                    {/*<th>{member.welcome_mail ? "Yes" : "Not yet"}</th>*/}
                    <th>{<Dropdown fluid  options={welcomeMailOptions} defaultValue={member.welcome_mail} onChange={e => this.welcomeChange(e, member)} />}</th>
                    <th><button data-member-id={member.id} onClick={(e)=>{
                    }}><Link to={`/newmember/${member.id}`}  >Edit</Link></button></th>
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

export default connect(mapStateToProps, {fetchingMembers})(Members);
