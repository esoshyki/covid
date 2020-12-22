import covidService from '../../services/covid.service';
import { GET_COUNTRIES, COUNTRIES_LOADING, COUNTRIES_GOT } from './actions'
import Coords from '../../components/Map/Coords';

const getCountries = () => async dispatch => {
  dispatch({type: COUNTRIES_LOADING})
  try {
    const response = await covidService.getStatistic();
    const data = await response.data;
    dispatch({type: COUNTRIES_GOT})
    const payload = data?.response ? data.response.map(con => {
      const { country } = con;
      return {
        ...con,
        ISO: Coords[country]?.ISO,
        lat: Coords[country]?.lat,
        long: Coords[country]?.long
      }
    }) : []
    dispatch({type: GET_COUNTRIES, payload: payload})
    } catch (err) {
      console.log(err)
      dispatch({type: COUNTRIES_GOT})
    }
}

export default getCountries