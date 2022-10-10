import {  all, fork, call, put, take, takeEvery, takeLatest, throttle, delay  } from 'redux-saga/effects'
import shortid from 'shortid'
import { 
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

        function addPostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
  }
function* addPost(action){
    try{
        //const result = yield call(addPostAPI, action.data) 
        yield delay(1000)
        const id = shortid.generate()
        yield put({ 
          type: ADD_POST_SUCCESS,
          data: {
            id,
            content: action.data
          }
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })

    } catch(err){
        yield put({ 
            type: ADD_POST_FAILURE,
            error: err.response.data
        })
    }

}

function removePostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('URL', data)
  }
function* removePost(action){
    try{
        //const result = yield call(removePostAPI, action.data) 
        yield delay(1000)
        yield put({ 
          type: REMOVE_POST_SUCCESS,
          data: action.data
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        })

    } catch(err){
        console.error(err )
        yield put({ 
            type: REMOVE_POST_FAILURE,
            error: err.response.data
        })
    }

}

function addCommentAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post(`/api/post/${data.postId}/comment`, data)
  }
function* addComment(action){
    try{
        //const result = yield call(addCommentAPI, action.data) 
        yield delay(1000)

        yield put({ 
        type: ADD_COMMENT_SUCCESS,
        data: action.data
        })
    } catch(err){
        yield put({ 
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    }

}

function* watchaddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchremovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
export default function* postSaga() {
    yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행
      fork(watchaddPost), // fork 는 안의 함수를 실행한다는 의미 ( fork 는 비동기 함수 호출)
      fork(watchAddComment),
      fork(watchremovePost), 
      
    ])
}