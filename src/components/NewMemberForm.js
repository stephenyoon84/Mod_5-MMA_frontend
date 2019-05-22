import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
// import {Redirect, withRouter} from 'react-router-dom'
import {URL, genderOptions, fetchingMembers, activeOptions, welcomeMailOptions, fetchingGroups} from '../redux/actionCreators';

class NewMemberForm extends Component {
  state = {
  }

  genderChange = (e, d) => {
    this.setState({gender: d.value})
  }

  activeChange = (e, d) => {
    this.setState({active: d.value})
  }

  welcomeChange = (e, d) => {
    this.setState({welcomeMail: d.value})
  }

  handleClickRegister = (e, d) => {
    // debugger
    let name = e.target.parentElement.name.value
    let email = e.target.parentElement.email.value
    let phone_number = e.target.parentElement.phoneNumber.value
    let gender = this.state.gender
    let dob = e.target.parentElement.dob.value
    let info = e.target.parentElement.info.value
    let new_member = {name: name, email: email, phone_number: phone_number, gender: gender, dob: dob, info: info}
    e.target.parentElement.name.value = ""
    e.target.parentElement.email.value = ""
    e.target.parentElement.phoneNumber.value = ""
    e.target.parentElement.dob.value = ""
    e.target.parentElement.info.value = ""
    this.setState({gender: ""})
    console.log(new_member)
    fetch(URL + '/members', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        member: new_member
      })
    })
      .then(r => r.json())
      .then(this.handleResponseRegister)
      .then(() => {
        this.props.history.push('/')
      })
  }

  handleResponseRegister = json => {
    if (json["success"]) {
      this.props.fetchingMembers()
      alert("Register success")
    }
  }

  handleClickUpdate = (e) => {
    let name = e.target.parentElement.name.value
    let email = e.target.parentElement.email.value
    let phone_number = e.target.parentElement.phoneNumber.value
    let gender = this.state.gender
    let dob = e.target.parentElement.dob.value
    let info = e.target.parentElement.info.value
    let active = this.state.active
    let group = this.state.groups
    let welcome_mail = this.state.welcomeMail
    let memberid = parseInt(window.location.pathname.split('/')[2])
    let update_member = {id: memberid, name: name, email: email, phone_number: phone_number, gender: gender, dob: dob, info: info, active: active, group: group, welcome_mail: welcome_mail}
    e.target.parentElement.name.value = ""
    e.target.parentElement.email.value = ""
    e.target.parentElement.phoneNumber.value = ""
    e.target.parentElement.dob.value = ""
    e.target.parentElement.info.value = ""
    this.setState({gender: ""})
    console.log(update_member)
    const token = localStorage.getItem('token')
    fetch(URL + `/members/${memberid}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        member: update_member
      })
    })
      .then(r => r.json())
      .then(this.handleResponseUpdate)
      .then(() => this.props.history.push('/smallgroups'))
  }

  handleResponseUpdate = json => {
    if (json["success"]) {
      this.props.fetchingMembers()
      this.props.fetchingGroups()
      alert("Update success")
    }
  }

  groupOptions = () => {
    return this.props.groups.map(g => {
      return {key: g.name, text: g.name, value: g.name}
    })
  }

  groupChange = (e, d) => {
    this.setState({groups: d.value})
  }

  render() {
    let memberid = parseInt(window.location.pathname.split('/')[2])
    const target = this.props.members.find(m => m.id === memberid)
    return (
      <div>
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form >
                <Form.Input icon='user' iconPosition="left" label="Name" placeholder="Name" name="name" defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.name}`)}/>
                <Form.Input icon='mail' iconPosition="left" label="email" placeholder="Email" name="email" defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.email}`)}/>
                <Form.Input icon='phone' iconPosition="left" label="Phone Number" placeholder="Phone Number" name="phoneNumber" defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.phone_number}`)}/>
                <Form.Select label="Gender" options={genderOptions} placeholder="Gender" name="gender" onChange={this.genderChange} defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.gender}`)}/>
                <Form.Input icon='birthday' iconPosition="left" label="Birthday" placeholder="MM/DD/YYYY" name="dob" defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.dob}`)}/>
                <Form.Input label="Info" placeholder="Info" name="info" defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (`${target.info}`)}/>
                {
                  isNaN(memberid) ? (
                    null
                  ) : (
                    <Fragment>
                      <Form.Select label="Active?" options={activeOptions} placeholder="Active?" name="active" onChange={this.activeChange} defaultValue={(target === undefined || isNaN(memberid)) ? ("") : (this.state.active ? "Yes" : "No")}/>
                      <Form.Select label="Welcome Mail" options={welcomeMailOptions} placeholder="Welcome Mail?" onChange={this.welcomeChange} />
                      <Form.Select label="Group" options={this.groupOptions()} name="group" onChange={this.groupChange} />
                    </Fragment>
                  )
                }

                {
                  isNaN(memberid) ? (
                    <Button type="submit" content="Register" primary onClick={this.handleClickRegister}/>
                  ) : (
                    <Button type="submit" content="Update" primary onClick={this.handleClickUpdate}/>
                  )
                }
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  members: store.members,
  groups: store.groups.filter(g => g.year === new Date().getFullYear())
})

export default connect(mapStateToProps, {fetchingMembers, fetchingGroups})(NewMemberForm)
