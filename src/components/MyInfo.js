import React, { Component } from 'react';
import {Button, Form, Segment, Grid} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import {URL} from '../redux/actionCreators';

class MyInfo extends Component {
  render() {
    if (!!localStorage.token) {
      if (this.props.user) {
        return (
          <div>
            <Segment placeholder>
              <Grid columns={3} relaxed='very' centered>
                <Grid.Column>
                  <Form>
                    <Form.Input icon='user' iconPosition='left' label="Name" name="name" />
                    <Form.Input icon='mail' iconPosition='left' label='email' name='email' />
                    <Form.Input icon='phone' iconPosition='left' label='Phone Number' name='phoneNumber' />
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
