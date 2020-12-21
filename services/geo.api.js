import axios from 'axios'

const geoApi = process.env.getocodeApi;
const geoApiAuth = process.env.geocodeAuth;

export default {
  getCountryCoords : async country => axios(geoApi, {
    
    method: "GET",
    params: {
      access_key: geoApiAuth,
      country
    }
  })
}
