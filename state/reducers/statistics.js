import { GET_STATISTICS } from '../actions/actions'

const initial = {}

const statistics = (state=initial, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      return ({
        ...action.payload
      })
    default:
      return state
  }
}


export default statistics