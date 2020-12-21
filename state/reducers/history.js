import { GET_HISTORY } from '../actions/actions'

const initial = {
  chosenCountry: null,
  days: []
};

const countries = (state=initial, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return action.payload
    default:
      return state
  }
}

export default countries