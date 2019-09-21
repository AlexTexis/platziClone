import { createStore,compose,applyMiddleware } from 'redux'
import reducer from './reducers'
import reduxThunkMiddleware from 'redux-thunk'
const isDev = process.env.NODE_ENV !== 'production'
const composeEnhancer = isDev ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
const preloadState = {}

export const store = (preloadedState=preloadState) => {
  return createStore(
    reducer,
    preloadedState,
    composeEnhancer(applyMiddleware(reduxThunkMiddleware)) 
  )
}
