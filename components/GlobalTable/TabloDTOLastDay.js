export default function DTOLastDay(obj, callback) {  
    
    const DTO = {
      "totalCases" : obj.cases.new === null ? "-": obj.cases.new,
      "totalDeaths" : obj.deaths.new === null ? "-": obj.deaths.new,
      "totalRecoverd" : obj.cases.recovered === null ? "-": obj.cases.recovered,     
      "casesOnMillion" : obj.cases["1M_pop"] === null ? "-": obj.cases["1M_pop"],
      "deathOnMillion" : obj.deaths["1M_pop"] === null ? "-": obj.deaths["1M_pop"]         
    }
    
    return callback ? callback(DTO) : DTO
  }
  