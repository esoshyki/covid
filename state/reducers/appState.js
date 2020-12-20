import { CHANGE_KEY } from '../actions/actions'

const keys = {
  TotalConfirmed: "TotalConfirmed",
  TotalDeaths : "TotalDeaths",
  TotalRecovered : "TotalRecovered",
  NewConfirmed: "NewConfirmed",
  NewDeaths : "NewDeaths",
  NewRecovered : "NewRecovered",
  HundredKTotalConfirmed : "HundredKTotalConfirmed",
  HundredKTotalDead : "HundredKTotalDead",
  HundredKTotalRecovered : "HundredKTotalRecovered",
  HundredKDailyConfirmed : "HundredKDailyConfirmed",
  HundredKDailyDead : "HundredKDailyDead",
  HundredKDailyRecovered : "HundredKDailyDead"
}

const inital = {
  key: keys.TotalConfirmed,
  virtualKeyboard: false
}

const appState = (state=inital, action) => {
  switch (action.type) {
    case CHANGE_KEY:
      return {
        ...state,
        key: action.payload
      }
      default:
        return state
  }
}

export default appState
