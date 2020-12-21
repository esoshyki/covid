import covidService from '../../services/covid.service';
import { GET_STATISTICS } from './actions'

const getStatistic = (country) => async dispatch => {
  try {
    const response = await covidService.reserveApiStatistic();
    const data = await response.data;
    dispatch({type: GET_STATISTICS, payload: data})
    } catch (err) {
      console.log(err)
    }
}

export default getStatistic