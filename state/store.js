import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import countries from './reducers/countries'
import history from './reducers/history'
import appState from './reducers/appState'

const reducers = combineReducers({
  countries, history, appState
})

const _createStore = () => {

  const preloadedState = {};

  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return store
}

export default _createStore