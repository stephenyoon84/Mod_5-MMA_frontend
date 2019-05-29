import React, { Component } from 'react';
import {Button, Form, Segment, Grid} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {URL} from '../redux/actionCreators';

class MyInfo extends Component {
  handleSubmit = e => {
    // debugger
    let id = this.props.user.id
    let name = e.target.name.value
    let email = e.target.email.value
    let phone_number = e.target.phoneNumber.value
    let current_password = e.target.currentPassword.value
    let new_password = e.target.newPassword.value
    let password_confirmation = e.target.passwordConfirmation.value
    let user = {id: id, name: name, email: email, phone_number: phone_number, password: current_password, new_password: new_password, password_confirmation: password_confirmation}
    let token = localStorage.getItem('token')
    // console.log(user)
    current_password = ''
    fetch(URL + `/users/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        user: user
      })
    })
      .then(r => r.json())
      .then(this.handleResponse)
      .then(() => this.props.history.push('/'))
  }

  handleResponse = json => {
    if (json["success"]) {
      alert(json["message"])
    } else {
      alert(json["message"])
    }
  }

  render() {
    if (!!localStorage.token) {
      if (this.props.user) {
        const cUser = this.props.user
        // console.log(cUser)
        return (
          <div>
            <Segment placeholder>
              <Grid columns={3} relaxed='very' centered>
                <Grid.Column>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input icon='user' iconPosition='left' label="Name" name="name" defaultValue={cUser.name} />
                    <Form.Input icon='mail' iconPosition='left' label='email' name='email' defaultValue={cUser.email}/>
                    <Form.Input icon='phone' iconPosition='left' label='Phone Number' name='phoneNumber' defaultValue={cUser.phone_number}/>
                    <Form.Input icon='lock' iconPosition='left' label='Current Password' type='password' name='currentPassword' />
                    <Form.Input icon='lock' iconPosition='left' label='New Password' type='password' name='newPassword' />
                    <Form.Input icon='lock' iconPosition='left' label='Password Confirmation' type='password' name='passwordConfirmation' />

                    <Button type='submit' content='Submit' primary />
                  </Form>
                </Grid.Column>
              </Grid>
            </Segment>
          </div>
        )
      } else {
        return <div>loading.....</div>
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps)(MyInfo)
