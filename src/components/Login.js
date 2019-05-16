import React, {Component} from 'react';
import {Button, Divider, Form, Grid, Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {URL, loginUser} from '../redux/actionCreators'
import {LOGIN} from '../redux/actionType'

class Login extends Component {
  submitHandler = e => {
    // debugger
    e.preventDefault()
    console.log(e)
    let email = e.target.email.value
    let password = e.target.password.value
    // console.log(email, password, URL)
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
      // .then(console.log)
      .then(this.handleResponse)
      // debugger
  }

  handleResponse = json => {
    // debugger
    if (json["success"]) {
      localStorage.setItem("token", json["token"])
      this.props.dispatch(loginUser(json["user"]))
      //dispatch props user to user from json
      // return <Redirect to='/' />
      // not yet connected to store
      //set store state user to user
    } else {
      console.log("Error")
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

export default connect(mapStateToProps)(Login)
