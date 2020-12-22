import covidService from '../../services/covid.service';
import { GET_HISTORY, HISTORY_LOADING, HISTORY_GOT, CHOOSE_COUNTRY } from './actions'

const getHistory = (country) => async dispatch => {
  try {
    dispatch({type: HISTORY_LOADING})
    dispatch({type: CHOOSE_COUNTRY, payload: country})
    const response = await covidService.getHistory(country);
    const data = await response.data;
    const days = data?.response || []
    dispatch({type: GET_HISTORY, payload: days})
    dispatch({type: HISTORY_GOT})
    } catch (err) {
      console.log(err)
    }
}

export default getHistory