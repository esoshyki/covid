import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import countries from './reducers/countries'
import summary from './reducers/summary';
import chosenCountry from './reducers/chosenCountry'

const reducers = combineReducers({
  summary, countries, chosenCountry
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