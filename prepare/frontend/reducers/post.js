import shortId from 'shortid'
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
const reducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }

    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
      const post = { ...state.mainPosts[postIndex]}
      post.Comments = [dummyComment(action.data.content), ...post.Comments]
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      }

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      }
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false, 
        removePostDone: true,
      }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error
      }
    default:
        return state
  }
}

export default reducer