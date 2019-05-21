import {LOGIN, LOGOUT, FETCHED_MEMBERS, CLEAR_MEMBERS, FETCHED_GROUPS, CLEAR_GROUPS} from './actionType';

const URL = 'http://localhost:3001/api/v1'

const genderOptions = [
  {key: 'M', text: 'M', value: "M" },
  {key: 'F', text: 'F', value: "F" }
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

function fetchedGroups(groupsArray){
  return {type: FETCHED_GROUPS, payload: groupsArray}
}

function fetchingGroups() {
  return (dispatch) => {
    fetch(URL + '/groups')
      .then(r => r.json())
      .then(groupArray => {
        dispatch(fetchedGroups(groupArray))
      })
  }
}

function clearGroups(){
  return {type: CLEAR_GROUPS, payload: []}
}

export {URL, loginUser, logoutUser,fetchedMembers, fetchingMembers, clearMembers, genderOptions, activeOptions, fetchedGroups, fetchingGroups, clearGroups}
