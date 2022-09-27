import { HYDRATE } from "next-redux-wrapper"
import { combineReducers } from "redux"
import user from './user'
import post from './post'

/* const initialState = {
  user: {},
  post: {}
} */

 // (이전상태 ,액션) => 다음상태 
const rootReducer = combineReducers({
  index: (state = {}, action) => { // SSR 을 위한 부분
    switch(action.type){
      case HYDRATE:
        return { ...state, ...action.payload }
      default:
        return state
    }
  },
  user,
  post
})
export default rootReducer