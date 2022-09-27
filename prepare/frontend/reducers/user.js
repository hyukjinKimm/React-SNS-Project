export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpDate: {},
  loginData: {}
}
export const loginAction = (data) => {
    return {
      type: 'LOG_IN',
      data
    }
  }
export const logoutAction = (data) => {
    return {
    type: 'LOG_OUT',
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