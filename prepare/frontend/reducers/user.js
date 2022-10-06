export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false,
  isLoggingOut: false, // 로그 아웃 시도중
  me: null,
  signUpDate: {},
  loginData: {}
}
export const loginRequestAction = (data) => {
    return {
      type: 'LOG_IN_REQUEST',
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
    type: 'LOG_OUT_REQUEST',
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
    case 'LOG_IN_REQUEST':
      return {
          ...state,
          isLoggingIn: true,

        }
    case 'LOG_IN_SUCCESS':
      return {
          ...state,
          isLoggingIn: false,
          isLoggedIn: true,
          me: {...action.data, nickname: 'hyukjinkimm'}
        }
    case 'LOG_IN_FAILURE':
      return {
          ...state,
          isLoggingIn: false,
          isLoggedIn: false,

        }
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      }
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      }
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      }

    default:
        return state
  }
}

export default reducer