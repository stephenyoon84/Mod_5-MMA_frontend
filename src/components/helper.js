import React from 'react';
import {Form} from 'semantic-ui-react';
import {genderOptions, activeOptions, welcomeMailOptions} from '../redux/actionCreators'

const FormField = (type, value, helperM = null) => {
  switch(type) {
    case 'name':
      return <Form.Input icon='user' iconPosition='left' label='Name' placeholder='Name' name="name" defaultValue={value} />
    case 'email':
      return <Form.Input icon='mail' iconPosition="left" label="email" placeholder="Email" name="email" defaultValue={value} />
    case 'phone':
      return <Form.Input icon='phone' iconPosition="left" label="Phone Number" placeholder="Phone Number" name="phoneNumber" defaultValue={value}/>
    case 'gender':
      return <Form.Select label="Gender" options={genderOptions} placeholder="Gender" name="gender" onChange={helperM} defaultValue={value}/>
    case 'dob':
      return <Form.Input icon='birthday' iconPosition="left" label="Birthday" placeholder="MM/DD/YYYY" name="dob" defaultValue={value}/>
    case 'info':
      return <Form.Input label="Info" placeholder="Info" name="info" defaultValue={value}/>
    case 'active':
      return <Form.Select label="Active?" options={activeOptions} placeholder="Active?" name="active" onChange={helperM} defaultValue={value ? ('Yes') : ('No')}/>
    default:
      return null
  }
}

export default FormField
