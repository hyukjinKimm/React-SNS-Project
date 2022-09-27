export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'hyukjin'
    },
    content: '첫번째 게시글 입니다. #코딩열심히 #리액트프로젝트',
    Images: [{ 
      src: 'https://item.kakaocdn.net/do/bef59207f5155a4eddd632c9a833e80d7154249a3890514a43687a85e6b6cc82'
    }, { 
      src: 'https://item.kakaocdn.net/do/d2a0a7643a2133762001a4c50e588db682f3bd8c9735553d03f6f982e10ebe70'
    }, { 
      src: 'https://cdn.daily.hankooki.com/news/photo/202207/853815_1117391_2347.jpg'
    }],
    Comments: [{
      User: {
        nickname: '수지'
      },
      content: '혁진아 꿈을향해 노력하는모습이 멋있어.'
    },{
      User: {
        nickname: '재우'
      },
      content: '아따 짜식 열심히 하네잉 ㅋ'
    }]
  }],
  imagePaths: [],
  postAdded: false,
}

const ADD_POST = 'ADD_POST'
export const addPost = {
  type: ADD_POST
}

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'hyukjin'
  },
  Images: [],
  Comments: []
}
const reducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }

    default:
        return state
  }
}

export default reducer