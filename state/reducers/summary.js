import { CHANGE_SUMMARY_DATA, SUMMARY_ERROR } from '../actions/actions'

const initial = {};

const summary = (state=initial, action) => {
  switch (action.type) {
    case CHANGE_SUMMARY_DATA:
      return {
        ...action.payload
      }
    case SUMMARY_ERROR:
      return initial
    default:
      return state
  }
}


export default summary