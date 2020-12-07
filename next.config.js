const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    covidApi: "https://api.covid19api.com/",
    populationApi: "https://restcountries.eu/rest/v2/"
  }
}