import {combineReducers} from 'redux';
import {LOGIN, LOGOUT} from './actionType';

// const currentUserReducer = (oldState={}, action) => {
//   switch(action.type){
//     case LOGIN:
//       return
//     default:
//       return oldState
//   }
// }





// const rootReducer = combineReducers({
//   login: currentUserReducer
// })

// export default rootReducer
const initialState = {
  user: null
}
const reducer = (oldState=initialState, action) => {
  switch(action.type){
    case LOGIN:
      return {...oldState, user: action.payload}
    case LOGOUT:
      return {...oldState, user: action.payload}
    default:
      return oldState
  }
}

export default reducer
