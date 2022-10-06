import {  all, fork, call, put, take, takeEvery, takeLatest, throttle, delay  } from 'redux-saga/effects'
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, 
    LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE
} from '../reducers/user'
function logInAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
}
function* logIn(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        //const result = yield call(logInAPI, action.data) // call 은 동기함수 호출  
        yield delay(1000)
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
        type: LOG_IN_SUCCESS,
        data: action.data
        })
    } catch(err){
        yield put({ // 로그인 실패
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }

}
function logOutAPI(){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL')
}
function* logOut(){
    try{
        //const result = yield call(logOutAPI) 
        yield delay(1000)
        yield put({ 
            type: LOG_OUT_SUCCESS,
            //data: result.data
        })
    } catch(err){
        yield put({ 
            type: LOG_OUT_FAILURE,
            error: err.response.data
            })
    }

}
function signUpAPI(){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL')
}
function* signUp(){
    try{
        //const result = yield call(signUpAPI) 
        yield delay(1000)
        yield put({ 
            type: SIGN_UP_SUCCESS,
            //data: result.data
        })
    } catch(err){
        yield put({ 
            type: SIGN_UP_FAILURE,
            error: err.response.data
            })
    }

}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn) // LOG_IN 액션이 dispatch 되면 login 실행
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga(){
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp)
  ])
}