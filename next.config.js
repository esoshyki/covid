const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    covidApi: "https://api.covid19api.com/",
    reserveCovidApi: "https://https://covid-193.p.rapidapi.com",
    reserveApiKey: "81aeedd803msh0af6db2622c6dfcp1e49ccjsna8499e65bd2a",
    reserveApiHost: "covid-193.p.rapidapi.com",
    populationApi: "https://restcountries.eu/rest/v2/"
  }
}