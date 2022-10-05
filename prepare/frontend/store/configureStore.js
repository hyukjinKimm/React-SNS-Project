import { createWrapper }  from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

const configureStore = () => {
  const middlewares = [thunkMiddleware]
  const enhancer = process.env.NODE_ENV === 'productino' 
  ? compose(applyMiddleware(...middlewares))
  : composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(reducer, enhancer)
  return store
}
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
})

export default wrapper