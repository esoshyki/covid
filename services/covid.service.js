import axios from 'axios'

const covidApi = process.env.covidApi;
const populationApi = process.env.populationApi;
const reserveApi = process.env.reserveCovidApi;
const reserveApiKey = process.env.reserveApiKey;
const reserveApiHost = process.env.reserveApiHost;
const accessToken = '5cf9dfd5-3449-485e-b5ae-70a60e997864';
const worldPopulation = "all?fields=name;population;flag"


export default {
  reserveApiStatistic: async () => await axios('https://covid-193.p.rapidapi.com/statistics', {
    method: "GET",
    headers: {
      "x-rapidapi-key": reserveApiKey,
      "x-rapidapi-host": reserveApiHost,

    }
  }),
  getSummary: async () => await axios(covidApi + "summary", {
    method: "GET",
    headers: {
      "X-Access-Token" : accessToken
    }
  }),
  getDayOne: async (Slug) => await axios(covidApi + "dayOne/country/" + Slug, {
    method: "GET",
    headers: {
      "X-Access-Token" : accessToken
    }
  }),
  getContries: async () => await axios(covidApi + "countries", {
    method: "GET",
    headers: {
      "X-Access-Token" : accessToken
    }    
  }),
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
  getWorldPopulation: async () => await axios.get(populationApi + worldPopulation),
  getCountryPopulation: async (country) => await axios.get(populationApi + 'name/' + country)
}