export default function DTO(obj, callback) {
  
  const DTO = {
    "totalCases" : obj.cases.total === null ? "-": obj.cases.total,
    "totalDeaths" : obj.deaths.total === null ? "-": obj.deaths.total,
    "totalRecoverd" : obj.cases.recovered === null ? "-": obj.cases.recovered,    
    "casesOnMillion" : obj.cases["1M_pop"] === null ? "-": obj.cases["1M_pop"],
    "deathOnMillion" : obj.deaths["1M_pop"] === null ? "-": obj.deaths["1M_pop"],    
  }
  
  return callback ? callback(DTO) : DTO
}