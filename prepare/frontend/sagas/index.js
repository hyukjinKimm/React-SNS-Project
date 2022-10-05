import { all, fork, call, put, take, takeEvery, takeLatest, throttle, delay } from 'redux-saga/effects'
// take 는 1회용
// takeEvery  는 모든 액션

// takeLatest 는 마지막 요청의 응답만 받는것  (마지막 요청 이전의 오는 응답을 취소하는것임!! 요청은 전부간다.) 서버에서 중복된 요청이 오는것을 검증해야함.
// throttle 제한시간동안의 요청횟수에 제한을 둔다 
import axios from 'axios'
function logInAPI(data){
  // 실제로 서버에 요청을 보내는 부분
  return axios.post('URL', data)
}
function* logIn(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        //const result = yield call(logInAPI, action.data) // call 은 동기함수 호출  
        yield delay(1000)
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
          type: 'LOG_IN_SUCCESS',
          //data: result.data
        })
    } catch(err){
        yield put({ // 로그인 실패
            type: 'LOG_IN_FAILURE',
            data: err.response.data
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
            type: 'LOG_OUT_SUCCESS',
            //data: result.data
          })
      } catch(err){
          yield put({ 
              type: 'LOG_OUT_FAILURE',
              data: err.response.data
            })
      }
  
  }
  function addPostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
  }
  function* addPost(action){
      try{
          //const result = yield call(addPostAPI, action.data) 
          yield delay(1000)
          yield put({ 
            type: 'ADD_POST_SUCCESS',
            //data: result.data
          })
      } catch(err){
          yield put({ 
              type: 'ADD_POST_FAILURE',
              data: err.response.data
            })
      }
  
  }
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn) // LOG_IN 액션이 dispatch 되면 login 실행
}

function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logOut)
}

function* addPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost)
}
export default function* rootSaga() {
  yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행
    fork(watchLogIn), // fork 는 안의 함수를 실행한다는 의미 ( fork 는 비동기 함수 호출)
    fork(watchLogout),
    fork(addPost)

  ])
}