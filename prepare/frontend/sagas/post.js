import {  all, fork, call, put, take, takeEvery, takeLatest, throttle, delay  } from 'redux-saga/effects'
import { 
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, 
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, 
    RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

import axios from 'axios'
function addPostAPI(data){
  // 실제로 서버에 요청을 보내는 부분
  return axios.post('/post', data)
}
function* addPost(action){
    try{
        console.log('hi')
        console.log(action)
        const result = yield call(addPostAPI, action.data) 
        yield put({ 
          type: ADD_POST_SUCCESS,
          data: result.data
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id
        })

    } catch(err){
        yield put({ 
            type: ADD_POST_FAILURE,
            error: err.response.data
        })
    }

}
function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
  }
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
    const params = { lastId:lastId || 0 };
    return axios.get('/posts', {params});
  }
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.delete(`/post/${data}`)
  }
function* removePost(action){
    try{
        const result = yield call(removePostAPI, action.data) 
        yield delay(1000)
        yield put({ 
          type: REMOVE_POST_SUCCESS,
          data: result.data
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
    return axios.post(`/post/${data.postId}/comment`, data)
  }
function* addComment(action){
    try{
        const result = yield call(addCommentAPI, action.data) 
        yield put({ 
        type: ADD_COMMENT_SUCCESS,
        data: result.data
        })
    } catch(err){
        console.error(err)
        yield put({ 
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    }

}
function likePostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.patch(`/post/${data}/like`)
  }
function* likePost(action){
    try{
        const result = yield call(likePostAPI, action.data) 
        yield put({ 
        type: LIKE_POST_SUCCESS,
        data: result.data
        })
    } catch(err){
        console.error(err)
        yield put({ 
            type: LIKE_POST_FAILURE,
            error: err.response.data
        })
    }

}
function unlikePostAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.delete(`/post/${data}/like`)
  }
function* unlikePost(action){
    try{
        const result = yield call(unlikePostAPI, action.data) 
        yield put({ 
        type: UNLIKE_POST_SUCCESS,
        data: result.data
        })
    } catch(err){
        console.error(err)
        yield put({ 
            type: UNLIKE_POST_FAILURE,
            error: err.response.data
        })
    }

}
function uploadImagesAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post('post/images', data)
  }
function* uploadImages(action){
    try{
        const result = yield call(uploadImagesAPI, action.data) 
        yield put({ 
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data
        })
    } catch(err){
        console.error(err)
        yield put({ 
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        })
    }

}
function retweetAPI(data){
    // 실제로 서버에 요청을 보내는 부분
    return axios.post(`post/${data}/retweet`)
  }
function* retweet(action){
    try{
      
        const result = yield call(retweetAPI, action.data) 
        yield put({ 
        type: RETWEET_SUCCESS,
        data: result.data
        })
    } catch(err){
        console.error(err)
        yield put({ 
            type: RETWEET_FAILURE,
            error: err.response.data
        })
    }

}
function* watchlikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}
function* watchunlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}
function* watchaddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchLoadPosts() {
    yield throttle(2000,LOAD_POSTS_REQUEST, loadPosts)
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}
function* watchremovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet)
}
export default function* postSaga() {
    yield all([ // all 은 배열안에 있는것들을 한방에 전부 실행 
      fork(watchRetweet),
      fork(watchUploadImages),
      fork(watchlikePost), 
      fork(watchunlikePost), 
      fork(watchaddPost), // fork 는 안의 함수를 실행한다는 의미 ( fork 는 비동기 함수 호출)
      fork(watchLoadPost),
      fork(watchLoadPosts),
      fork(watchAddComment),
      fork(watchremovePost), 
      
    ])
}