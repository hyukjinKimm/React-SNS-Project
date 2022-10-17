import {  all, fork, call, put, take, takeEvery, takeLatest, throttle, delay  } from 'redux-saga/effects'
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, 
    LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE
} from '../reducers/user'
import axios from 'axios'
function logInAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('/user/login', data)
}
function* logIn(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        const result = yield call(logInAPI, action.data) // call 은 동기함수 호출  
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
        type: LOG_IN_SUCCESS,
        data: result.data
        })
    } catch(err){
        yield put({ // 로그인 실패
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }

}
function followAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
}
function* follow(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        //const result = yield call(followAPI, action.data) // call 은 동기함수 호출  
        yield delay(1000)
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
        type: FOLLOW_SUCCESS,
        data: action.data
        })
    } catch(err){
        yield put({ // 로그인 실패
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }

}
function unfollowAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
}
function* unfollow(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        //const result = yield call(unfollowAPI, action.data) // call 은 동기함수 호출  
        yield delay(1000)
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
        type: UNFOLLOW_SUCCESS,
        data: action.data
        })
    } catch(err){
        yield put({ // 로그인 실패
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }

}
function logOutAPI(){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('user/logout')
}
function* logOut(){
    try{
        yield call(logOutAPI) 
        yield put({ 
            type: LOG_OUT_SUCCESS,
        })
    } catch(err){
        yield put({ 
            type: LOG_OUT_FAILURE,
            error: err.response.data
            })
    }

}
function signUpAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('/user', data)
    
}
function* signUp(action){
    try{
        const result = yield call(signUpAPI, action.data) 
        console.log(result)
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

function loadUserAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.get('/user')
    
}
function* loadUser(action){
    try{
        const result = yield call(loadUserAPI, action.data) 
        yield put({ 
            type: LOAD_USER_SUCCESS,
            data: result.data
        })
    } catch(err){
        yield put({ 
            type: LOAD_USER_FAILURE,
            error: err.response.data
            })
    }

}

function changeNicknameAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.patch('/user/nickname', { nickname: data})
    
}
function* changeNickname(action){
    try{
        const result = yield call(changeNicknameAPI, action.data) 
        yield put({ 
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data
        })
    } catch(err){
        yield put({ 
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data
            })
    }

}
function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
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
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga(){
  yield all([
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadUser)
  ])
}