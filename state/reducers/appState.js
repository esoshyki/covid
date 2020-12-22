import { CHANGE_KEY, API_LOADING, API_DONE } from '../actions/actions'

export const keys = {
  totalCases: "totalCases",
  totalDeaths : "totalDeaths",
  totalRecoverd : "totalRecoverd",
  newCases: "newCases",
  newDeaths : "newDeaths",
  casesOnMillion : "casesOnMillion",
  deathOnMillion : "deathOnMillion",
}

const inital = {
  key: keys.totalCases,
  loading: false
}

const appState = (state=inital, action) => {
  switch (action.type) {
    case CHANGE_KEY:
      return {
        ...state,
        key: action.payload
      }
    case API_LOADING:
      return {
        ...state,
        loading: true
      }
    case API_DONE:
      return {
        ...state,
        loading: false
      }
      default:
        return state
  }
}

export default appState
