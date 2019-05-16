import {LOGIN, LOGOUT} from './actionType';

const URL = 'http://localhost:3001/api/v1'

// function onSearch(searchText){
//   return {type: CHANGING_SEARCH_TEXT, payload: searchText}
// }

function loginUser(currentUser){
  return {type: LOGIN, payload: currentUser}
}

function logoutUser(){
  return {type: LOGOUT, payload: null}
}

export {URL, loginUser, logoutUser}
