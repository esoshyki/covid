import { CHANGE_COUNTRIES, COUNTRIES_ERROR } from '../actions/actions'

const initial = [];

const countries = (state=initial, action) => {
  switch (action.type) {
    case CHANGE_COUNTRIES:
      return action.payload
    case COUNTRIES_ERROR:
      return initial
    default:
      return state
  }
}

export default countries