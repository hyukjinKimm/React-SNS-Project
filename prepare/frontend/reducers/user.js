export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpDate: {},
  loginData: {}
}
export const loginRequestAction = (data) => {
    return {
      type: 'LOG_IN_REQURES',
      data
    }
}
export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data
  }
}

export const loginActionFailure = (data) => {
  return {
    type: 'LOG_IN_FAILURE',
    data
  }
}
export const logoutRequestAction = (data) => {
    return {
    type: 'LOG_OUT_REQURES',
    }
}
export const logoutSuccessAction = (data) => {
  return {
  type: 'LOG_OUT_SUCCESS',
  }
}

export const logoutRequestFailure = (data) => {
  return {
  type: 'LOG_OUT_FAILURE',
  }
}
const reducer = (state=initialState, action) => {
  switch(action.type){
    case 'LOG_IN':
      return {
          ...state,
          me: action.data,
          isLoggedIn: true,
        }
      
    case 'LOG_OUT':
    return {
       ...state,
       me: null,
       isLoggedIn: false,
    }
    default:
        return state
  }
}

export default reducer