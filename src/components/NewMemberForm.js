import React, {Component} from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {URL, genderOptions} from '../redux/actionCreators';

class NewMemberForm extends Component {
  state = {
    gender: ""
  }

  genderChange = (e, d) => {
    this.setState({gender: d.value})
  }

  handleSubmit = (e) => {
    let name = e.target.name.value
    let email = e.target.email.value
    let phone_number = e.target.phoneNumber.value
    let gender = this.state.gender
    let dob = e.target.dob.value
    let info = e.target.info.value
    let new_member = {name: name, email: email, phone_number: phone_number, gender: gender, dob: dob, info: info}
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
      .then(console.log)
  }

  render() {
    return (
      <div>
        <div>New comer register form will be here</div>
        <Segment placeholder>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input icon='user' iconPosition="left" label="Name" placeholder="Name" name="name"/>
                <Form.Input icon='mail' iconPosition="left" label="email" placeholder="Email" name="email"/>
                <Form.Input icon='phone' iconPosition="left" label="Phone Number" placeholder="Phone Number" name="phoneNumber"/>
                <Form.Select label="Gender" options={genderOptions} placeholder="Gender" name="gender" onChange={this.genderChange}/>
                <Form.Input icon='birthday' iconPosition="left" label="Birthday" placeholder="MM/DD/YYYY" name="dob"/>
                <Form.Input label="Info" placeholder="Info" name="info" />

                <Button type="submit" content="Register" primary />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default NewMemberForm
