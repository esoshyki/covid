import axios from 'axios'

const covidApi = process.env.covidApi;
const populationApi = process.env.populationApi;
const reserveApi = process.env.reserveCovidApi;
const reserveApiKey = process.env.reserveApiKey;
const reserveApiHost = process.env.reserveApiHost;
const accessToken = '5cf9dfd5-3449-485e-b5ae-70a60e997864';
const worldPopulation = "all?fields=name;population;flag"


export default {
  getStatistic: async () => await axios('https://covid-193.p.rapidapi.com/statistics', {
    method: "GET",
    headers: {
      "x-rapidapi-key": reserveApiKey,
      "x-rapidapi-host": reserveApiHost,
    }
  }),
  getHistory: async (country) => axios('https://covid-193.p.rapidapi.com/history/?country=' + (country?.country || "All"), {
    method: "GET",
    headers: {
      "x-rapidapi-key": reserveApiKey,
      "x-rapidapi-host": reserveApiHost,
    },
  }) 
}