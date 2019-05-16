import {combineReducers} from 'redux';
import {LOGIN, LOGOUT} from './actionType';

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

const rootReducer = combineReducers({
  user: currentUserReducer
})

export default rootReducer


// const initialState = {
//   user: null
// }
// const reducer = (oldState=initialState, action) => {
//   switch(action.type){
//     case LOGIN:
//       return {...oldState, user: action.payload}
//     case LOGOUT:
//       return {...oldState, user: action.payload}
//     default:
//       return oldState
//   }
// }
//
// export default reducer
