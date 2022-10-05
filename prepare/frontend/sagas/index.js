import { all, fork, call, put, take } from 'redux-saga/effects'
import axios from 'axios'
function logInAPI(){
  // 실제로 서버에 요청을 보내는 부분
  return axios.post('URL')
}
function* logIn(action){  // LOG_IN_REQUEST 액션이 여가로 전달된다,
    try{
        const result = yield call(logInAPI, action.data) // call 은 동기함수 호출  
        yield put({ // 로그인 성공 PUT 은 disaptch 이다 .
          type: 'LOG_IN_SUCCESS',
          data: result.data
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
          const result = yield call(logOutAPI) 
          yield put({ 
            type: 'LOG_OUT_SUCCESS',
            data: result.data
          })
      } catch(err){
          yield put({ 
              type: 'LOG_OUT_FAILURE',
              data: err.response.data
            })
      }
  
  }
  function addPostAPI(){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL')
  }
  function* addPost(){
      try{
          const result = yield call(addPostAPI) 
          yield put({ 
            type: 'ADD_POST_SUCCESS',
            data: result.data
          })
      } catch(err){
          yield put({ 
              type: 'ADD_POST_FAILURE',
              data: err.response.data
            })
      }
  
  }
function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn) // LOG_IN 액션이 dispatch 되면 login 실행
}

function* watchLogout() {
    yield take('LOG_OUT_REQUEST', logOut)
}

function* addPost() {
    yield take('ADD_POST_REQUEST', addPost)
}
export default function* rootSaga() {
  yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행
    fork(watchLogIn), // fork 는 안의 함수를 실행한다는 의미 ( fork 는 비동기 함수 호출)
    fork(watchLogout),
    fork(addPost)

  ])
}