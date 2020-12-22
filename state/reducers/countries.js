import { GET_COUNTRIES } from '../actions/actions'

const initial = [];

const countries = (state=initial, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return [...action.payload]
    default:
      return state
  }
}

export default countries