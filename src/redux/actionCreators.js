import {LOGIN, LOGOUT, FETCHED_MEMBERS, CLEAR_MEMBERS} from './actionType';

const URL = 'http://localhost:3001/api/v1'

const genderOptions = [
  {key: 'M', text: 'Male', value: "M" },
  {key: 'F', text: 'Female', value: "F" }
]

const activeOptions = [
  {key: 'Yes', text: 'Yes', value: true},
  {key: 'No', text: 'No', value: false}
]

function loginUser(user){
  return {type: LOGIN, payload: user}
}

function logoutUser(){
  return {type: LOGOUT, payload: null}
}

function fetchedMembers(membersArray){
  return {type: FETCHED_MEMBERS, payload: membersArray}
}

function fetchingMembers() {
  return (dispatch) => {
    fetch(URL + '/members')
      .then(r => r.json())
      .then(membersArray => {
        dispatch(fetchedMembers(membersArray))
      })
  }
}

function clearMembers() {
  return {type: CLEAR_MEMBERS, payload: []}
}

export {URL, loginUser, logoutUser,fetchedMembers, fetchingMembers, clearMembers, genderOptions, activeOptions}
