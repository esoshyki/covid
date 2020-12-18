import covidService from '../../services/covid.service';
import { CHANGE_SUMMARY_DATA, SUMMARY_ERROR, CHANGE_COUNTRIES, COUNTRIES_ERROR } from './actions'

const getSummary = () => async dispatch => {
  try {
    const response = await covidService.getSummary();
    const data = await response.data;
    const dataObj = {
      ...data.Global,
      population: data.Countries.reduce((acc, cur) => acc + cur.Premium.CountryStats.Population, 0)
    }
    dispatch({type: CHANGE_SUMMARY_DATA, payload: dataObj})
    dispatch({type: CHANGE_COUNTRIES, payload: data.Countries})
  } catch (err) {
    dispatch({type: SUMMARY_ERROR})
  }
}

export default getSummary