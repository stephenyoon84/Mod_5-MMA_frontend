import {combineReducers} from 'redux';
import {LOGIN} from './actionType';

const currentUserReducer = (oldState={}, action) => {
  switch(action.type){
    case LOGIN:
      return
    default:
      return oldState
  }
}





const rootReducer = combineReducers({
  login: currentUserReducer
})

export default rootReducer
