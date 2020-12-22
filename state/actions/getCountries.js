import covidService from '../../services/covid.service';
import { GET_COUNTRIES } from './actions'
import Coords from '../../components/Map/Coords';

const getCountries = () => async dispatch => {
  try {
    const response = await covidService.getStatistic();
    const data = await response.data;
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
    }
}

export default getCountries