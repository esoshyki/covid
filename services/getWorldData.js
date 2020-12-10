import covidService from './covid.service'

const geWorldData = async () => {
  const covid = await covidService.getSummary();
  const _population = await covidService.getWorldPopulation();
  const _covidData = await covid.data;
  const populationData = await _population.data;

  console.log(_covidData)

  const { 
    TotalConfirmed, 
    NewConfirmed, 
    NewDeaths, 
    TotalDeaths, 
    NewRecovered, 
    TotalRecovered, 
     } = _covidData.Global;


    return ({
    Confirmed: TotalConfirmed,
    day_Confirmed: NewConfirmed,
    Deaths: TotalDeaths,
    day_Deaths: NewDeaths,
    Recovered: TotalRecovered,
    day_Recovered: NewRecovered,
    population: populationData.reduce((acc, cur) => acc + cur.population, 0),
    Countries: _covidData.Countries
  }) 
}

export default geWorldData