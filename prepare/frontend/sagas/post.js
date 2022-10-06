import {  all, fork, call, put, take, takeEvery, takeLatest, throttle, delay  } from 'redux-saga/effects'
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

function* watchaddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost)
}
export default function* postSaga() {
    yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행
      fork(watchaddPost) // fork 는 안의 함수를 실행한다는 의미 ( fork 는 비동기 함수 호출)
  
    ])
}