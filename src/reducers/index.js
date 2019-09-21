import { combineReducers } from 'redux'
import publicationsReducer from './publicationsReducer'
import userReducer from './userReducer'
import challengesReducer from './challengesReducer'

const rootReducer = combineReducers({
  publicationsReducer,
  userReducer,
  challengesReducer
})

export default rootReducer