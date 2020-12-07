const covidApi = process.env.covidApi;
const populationApi = process.env.populationApi;
const accessToken = '5cf9dfd5-3449-485e-b5ae-70a60e997864';
const worldPopulation = "all?fields=name;population;flag"

export default {
  getSummary: async () => fetch(covidApi + "summary", {
    method: "GET",
    headers: {
      "X-Access-Token" : accessToken
    }
  }),
  getWorldPopulation: async () => fetch(populationApi + worldPopulation)
}