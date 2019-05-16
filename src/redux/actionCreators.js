import {LOGIN, LOGOUT} from './actionType';

const URL = 'http://localhost:3001/api/v1'

function loginUser(user){
  return {type: LOGIN, payload: user}
}

function logoutUser(){
  return {type: LOGOUT, payload: null}
}

export {URL, loginUser, logoutUser}
