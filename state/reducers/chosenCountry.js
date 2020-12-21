import { CHOOSE_COUNTRY, CLEAR_COUNTRY } from '../actions/actions'

const initial = {
  country: null,
  days: []
};

const chooseCountry = (state=initial, action) => {
  switch (action.type) {
    case CHOOSE_COUNTRY:
      console.log(action.payload)
      const {country, data} = action.payload;
       return {
        country,
        days: [...data].map(day => {
          const { Confirmed, Deaths, Active, Date } = day;
          return { Confirmed, Deaths, Active, Date}
        })
      };
    case CLEAR_COUNTRY:
      return initial
    default:
      return state
  }
}


export default chooseCountry