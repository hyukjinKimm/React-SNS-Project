import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'
export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'hyukjin'
    },
    content: '첫번째 게시글 입니다. #코딩열심히 #리액트프로젝트',
    Images: [{ 
      id: shortId.generate(),
      src: 'https://item.kakaocdn.net/do/bef59207f5155a4eddd632c9a833e80d7154249a3890514a43687a85e6b6cc82'
    }, { 
      id: shortId.generate(),
      src: 'https://item.kakaocdn.net/do/d2a0a7643a2133762001a4c50e588db682f3bd8c9735553d03f6f982e10ebe70'
    }, { 
      id: shortId.generate(),
      src: 'https://cdn.daily.hankooki.com/news/photo/202207/853815_1117391_2347.jpg'
    }],
    Comments: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: '수지'
      },
      content: '혁진아 꿈을향해 노력하는모습이 멋있어.'
    },{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: '재우'
      },
      content: '아따 짜식 열심히 하네잉 ㅋ'
    }]
  }],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  
}
export const generateDummyPost = (number) =>   
Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName()
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image()
  }],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName()    
    },
    content: faker.lorem.sentence(),
  }],
}));


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const dummyPost = (data)  => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'hyukjin'
  },
  Images: [],
  Comments: []
})

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'hyukjin'
  },
})
// 이전상태를 액션을 통해 다음상태로 만들어내는 함수 => reducer
const reducer = (state=initialState, action) => {
  return produce(state, (draft) => {
    switch(action.type){
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true
        draft.loadPostsDone = false
        draft.loadPostsError = null
        break
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false
        draft.loadPostsDone = true 
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.hasMorePosts = draft.mainPosts.length < 50
        break
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false 
        draft.loadPostsError = action.arror 
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false
        draft.addPostDone = true 
        draft.mainPosts.unshift(dummyPost(action.data))
        break
      case ADD_POST_FAILURE:
        draft.addPostLoading = false 
        draft.addPostError = action.arror 
        break
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true 
        draft.addCommentDone = false 
        draft.addCommentError = null 
        break 
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false 
        draft.addCommentDone = true 
        break 
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false 
        draft.addCommentError = action.error 
        break
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true 
        draft.removePostDone = false 
        draft.removePostError = null 
        break
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false 
        draft.removePostDone = true 
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
        break
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false 
        draft.removePostError = action.error
        break
      default:
          return state
    }
  })

}

export default reducer