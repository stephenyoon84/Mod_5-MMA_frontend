import React, {Component} from 'react';
import {Button, Divider, Form, Grid, Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {URL, loginUser, fetchingMembers, fetchingGroups, fetchingUsers} from '../redux/actionCreators'

class Login extends Component {
  submitHandler = e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    fetch(URL + '/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = json => {
    if (json["success"]) {
      localStorage.setItem("token", json["token"])
      this.props.loginUser(json["user"])
      this.props.fetchingMembers()
      this.props.fetchingGroups()
      if (this.props.user.user_type === 'admin'){
        this.props.fetchingUsers()
      }
    } else {
      alert("No matching email or password. Please check and try again.")
    }
  }

  render() {
    if (!!localStorage.token) {
      return <Redirect to='/' />
    } else {
      return (
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.submitHandler} >
                <Form.Input icon="mail" iconPosition="left" label="Email" placeholder="Email" name="email" />
                <Form.Input icon="lock" iconPosition="left" label="Password" type="password" placeholder="Password" name="password" />
                <Form.Button type="submit" content="Login" primary/>
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button content={<Link to='/signup'>Sign Up</Link>} size="big" />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, {loginUser, fetchingMembers, fetchingGroups, fetchingUsers})(Login)
