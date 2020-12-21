import axios from 'axios'

const covidApi = process.env.covidApi;
const populationApi = process.env.populationApi;
const accessToken = '5cf9dfd5-3449-485e-b5ae-70a60e997864';
const worldPopulation = "all?fields=name;population;flag"


export default {
  getSummary: async () => await axios(covidApi + "summary", {
    method: "GET",
    headers: {
      "X-Access-Token" : accessToken
    }
  }),
  getDayOne: async (Slug) => await axios.get(covidApi + "total/country/" + Slug),
  getContries: async () => await axios.get(covidApi + "countries"),
  getByCountry: async ({type="dayone", country}) => await axios(`${covidApi}${type}/country/${country}`, {
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET',
    }
  }),
  getAllWorldData: async () => {
    const data = axios(covidApi, {
      method: "GET",

    })
  },
  getConfirmedByCountry: async country => await axios.get(`${covidApi}total/country/${country}/status/confirmed`),
  getDeathsByCountry: async country => await axios.get(`${covidApi}total/country/${country}/status/deaths`),
  getRecoveredByCountry: async country => await axios.get(`${covidApi}total/country/${country}/status/recovered`),
  getWorldPopulation: async () => await axios.get(populationApi + worldPopulation),
  getCountryPopulation: async (country) => await axios.get(populationApi + 'name/' + country),
  getCountryPeriod: async () => await axios.get(covidApi + 'world?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z'),

}