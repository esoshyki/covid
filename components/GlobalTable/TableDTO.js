export default function DTO(obj, callback) {
  const population = obj.population;

  const get100k = (value, x=0) => "" + (Math.round((+value * (10 ** 5) * (10 ** x)) / (+population))) / (10 ** x)

  const DTO = {
    "TotalConfirmed" : obj.TotalConfirmed,
    "TotalDeaths" : obj.TotalDeaths,
    "TotalRecovered" : obj.TotalRecovered,
    "NewConfirmed" : obj.NewConfirmed,
    "NewDeaths" : obj.NewDeaths,
    "NewRecovered" : obj.NewRecovered,
    "HundredKTotalConfirmed" : get100k(obj.TotalConfirmed),
    "HundredKTotalDead" : get100k(obj.TotalDeaths),
    "HundredKTotalRecovered" : get100k(obj.TotalRecovered),
    "HundredKDailyConfirmed" : get100k(obj.NewConfirmed),
    "HundredKDailyDead" : get100k(obj.NewDeaths),
    "HundredKDailyRecovered" : get100k(obj.NewRecovered)
  }
  return callback ? callback(DTO) : DTO
}
