import covidService from '../../services/covid.service';
import { GET_HISTORY, API_LOADING, API_DONE } from './actions'

const getHistory = (country) => async dispatch => {
  try {
    dispatch({type: API_LOADING})
    const response = await covidService.getHistory(country);
    const data = await response.data;
    const days = data?.response || []
    dispatch({type: GET_HISTORY, payload: {
      chosenCountry: country,
      days
    }})
    dispatch({type: API_DONE})
    } catch (err) {
      console.log(err)
    }
}

export default getHistory