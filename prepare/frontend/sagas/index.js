import { all, fork, call, put, take, takeEvery, takeLatest, throttle, delay } from 'redux-saga/effects'
import axios from 'axios'
import postSaga from './post'
import userSaga from './user'
// take 는 1회용
// takeEvery  는 모든 액션

// takeLatest 는 마지막 요청의 응답만 받는것  (마지막 요청 이전의 오는 응답을 취소하는것임!! 요청은 전부간다.) 서버에서 중복된 요청이 오는것을 검증해야함.
// throttle 제한시간동안의 요청횟수에 제한을 둔다 

axios.defaults.baseURL = "http://localhost:3065";
export default function* rootSaga() {
  yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행
    fork(postSaga),
    fork(userSaga)
  ])
}