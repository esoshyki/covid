import covidService from '../../services/covid.service';
import { CLEAR_COUNTRY, CHOOSE_COUNTRY } from './actions'

const chooseCountry = (country) => async dispatch => {

  if (!country) {
    dispatch({type: CLEAR_COUNTRY})
  } else {
    try {
      const { Slug } = country
      const response = await covidService.getDayOne(Slug);
      const data = await response.data;
      dispatch({type: CHOOSE_COUNTRY, payload: {country, data}})
    } catch (err) {
      console.log(err)
    }
  }
}

export default chooseCountry