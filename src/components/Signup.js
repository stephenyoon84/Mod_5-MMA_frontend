import React, {Component} from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {URL, loginUser} from '../redux/actionCreators'

const genderOptions = [
  {key: 'M', text: 'Male', value: "M" },
  {key: 'F', text: 'Female', value: "F" }
]

class Signup extends Component {
  state = {
    gender: ""
  }

  handleSubmit = (e) => {
    let name = e.target.name.value
    let email = e.target.email.value
    let phone_number = e.target.phoneNumber.value
    let gender = this.state.gender
    let dob = e.target.dob.value
    let password = e.target.password.value
    let password_confirmation = e.target.password_confirmation.value
    let user = {name: name, email: email, phone_number: phone_number, gender: gender, dob: dob, password: password, password_confirmation: password_confirmation}
    console.log(user)
    fetch(URL + '/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: user
      })
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = json => {
    if (json["success"]) {
      localStorage.setItem('token', json['token'])
      this.props.loginUser(json["user"])
    } else {
      console.log("Error")
    }
  }

  genderChange = (e) => {
    this.setState({gender: e.target.innerText})
  }

  // params.require(:user).permit(:name, :email, :phone_number, :gender, :dob, :register_date, :active, :info, :user_type, :password, :password_confirmation)

  render() {
    if (!!localStorage.token){
      return <Redirect to='/' />
    } else {
      return (
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input icon='user' iconPosition="left" label="Name" placeholder="Name" name="name"/>
                <Form.Input icon='mail' iconPosition="left" label="email" placeholder="Email" name="email"/>
                <Form.Input icon='phone' iconPosition="left" label="Phone Number" placeholder="Phone Number" name="phoneNumber"/>
                <Form.Select label="Gender" options={genderOptions} placeholder="Gender" name="gender" onChange={this.genderChange}/>
                <Form.Input icon='birthday' iconPosition="left" label="Birthday" placeholder="MM/DD/YYYY" name="dob"/>

                <Form.Input icon='lock' iconPosition="left" label="password" type="password" placeholder="Password" name="password"/>
                <Form.Input icon='lock' iconPosition="left" label="password_confirmation" type="password" placeholder="Password Confirmation" name="password_confirmation"/>

                <Button type="submit" content="Sign Up" primary />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (store) => ({
  user: store.user
})

export default connect(mapStateToProps, {loginUser})(Signup)
