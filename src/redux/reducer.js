import {combineReducers} from 'redux';
import {LOGIN, LOGOUT, FETCHED_MEMBERS, CLEAR_MEMBERS, FETCHED_GROUPS, CLEAR_GROUPS, FETCHED_USERS, CLEAR_USERS} from './actionType';

const currentUserReducer = (oldState=null, action) => {
  switch(action.type){
    case LOGIN:
      return action.payload
    case LOGOUT:
      return action.payload
    default:
      return oldState
  }
}

const usersReducer = (oldState=[], action) => {
  switch(action.type){
    case FETCHED_USERS:
      return action.payload
    case CLEAR_USERS:
      return action.payload
    default:
      return oldState
  }
}

const membersReducer = (oldState=[], action) => {
  switch(action.type){
    case FETCHED_MEMBERS:
      return action.payload
    case CLEAR_MEMBERS:
      return action.payload
    default:
      return oldState
  }
}

const groupsReducer = (oldState=[], action) => {
  switch(action.type){
    case FETCHED_GROUPS:
      return action.payload
    case CLEAR_GROUPS:
      return action.payload
    default:
      return oldState
  }
}

const rootReducer = combineReducers({
  user: currentUserReducer,
  members: membersReducer,
  groups: groupsReducer,
  users: usersReducer
})

export default rootReducer
