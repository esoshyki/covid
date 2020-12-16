export default function DTO(obj, callback) {
  const population = obj.population;

  const get100k = (value, x=0) => "" + (Math.round((+value * (10 ** 5) * (10 ** x)) / (+population))) / (10 ** x);

  const DTO = {
    "TotalConfirmed" : obj.TotalConfirmed,
    "TotalDeaths" : obj.TotalDeaths,
    "TotalRecovered" : obj.TotalRecovered,    
    "HundredKTotalConfirmed" : get100k(obj.TotalConfirmed),
    "HundredKTotalDead" : get100k(obj.TotalDeaths),
    "HundredKTotalRecovered" : get100k(obj.TotalRecovered),    
  }
  
  return callback ? callback(DTO) : DTO
}
