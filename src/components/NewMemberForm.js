import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {URL, fetchingMembers, fetchingGroups} from '../redux/actionCreators';
import FormField from './helper'

class NewMemberForm extends Component {
  state = {
  }

  genderChange = (e, d) => {
    this.setState({gender: d.value})
  }

  handleClickRegister = (e, d) => {
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
    } else {
      alert("Wrong information. Please check and input again.")
    }
  }

  handleClickUpdate = (e) => {
    let name = e.target.parentElement.name.value
    let email = e.target.parentElement.email.value
    let phone_number = e.target.parentElement.phoneNumber.value
    let info = e.target.parentElement.info.value
    let group = this.state.groups
    let memberid = parseInt(window.location.pathname.split('/')[2])
    let update_member = {id: memberid, name: name, email: email, phone_number: phone_number, info: info, group: group}
    e.target.parentElement.name.value = ""
    e.target.parentElement.email.value = ""
    e.target.parentElement.phoneNumber.value = ""
    e.target.parentElement.info.value = ""
    this.setState({gender: ""})
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
      .then(() => this.props.history.push('/members'))
  }

  handleResponseUpdate = json => {
    if (json["success"]) {
      this.props.fetchingMembers()
      this.props.fetchingGroups()
      alert("Update success")
    } else {
      alert("Wrong information. Please check and input again.")
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
    let target = this.props.members.find(m => m.id === memberid)
    if (target === undefined) {
      target = {name: '', email: '', phone_number: '', gender: '', dob: '', info: '', active: '', welcome_mail: ''}
    }
    return (
      <div>
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form >
                {FormField('name', target.name)}
                {FormField('email', target.email)}
                {FormField('phone', target.phone_number)}
                {
                  isNaN(memberid) ? (
                    <Fragment>
                      {FormField('gender', target.gender, this.genderChange)}
                      {FormField('dob', target.dob)}
                    </Fragment>
                  ) : (
                    null
                  )
                }
                {FormField('info', target.info)}
                {
                  isNaN(memberid) ? (
                    null
                  ) : (
                    <Fragment>
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
