import { CHANGE_KEY, 
  HISTORY_LOADING, 
  HISTORY_GOT,
  COUNTRIES_LOADING,
  COUNTRIES_GOT,
  CHOOSE_COUNTRY
} from '../actions/actions'

export const keys = {
  totalCases: "totalCases",
  totalDeaths : "totalDeaths",
  totalRecoverd : "totalRecoverd",
  newCases: "newCases",
  newDeaths : "newDeaths",
  casesOnMillion : "casesOnMillion",
  deathOnMillion : "deathOnMillion",
}

export const mappers = {
	[keys.totalCases] : day => day?.cases?.total || 0,
	[keys.totalDeaths] : day => day?.deaths?.total || 0,
	[keys.totalRecoverd] : day => day?.cases?.recovered || 0,
	[keys.newCases] : day => parseInt(day?.cases?.new || 0),
	[keys.newDeaths] : day => parseInt(day?.deaths?.new || 0),
	[keys.casesOnMillion] : day => parseInt(day?.cases["1M_pop"] || 0),
	[keys.deathOnMillion] : day => parseInt(day?.deaths["1M_pop"] || 0)
}

const inital = {
  key: keys.totalCases,
  mapper: mappers[keys.totalCases],
  historyLoading: false,
  countriesLoading: false,
  chosenCountry: null,
}

const appState = (state=inital, action) => {
  switch (action.type) {
    case CHANGE_KEY:
      return {
        ...state,
        key: action.payload,
        mapper: mappers[action.payload]
      }
    case HISTORY_LOADING:
      return {
        ...state,
        historyLoading: true
      }
    case HISTORY_GOT:
      return {
        ...state,
        historyLoading: false
      }
    case COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: true
      }
    case COUNTRIES_GOT:
      return {
        ...state,
        countriesLoading: false
      }
    case CHOOSE_COUNTRY:
      return {
        ...state,
        chosenCountry: action.payload
      }
    default:
      return state
  }
}

export default appState
