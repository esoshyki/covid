export default function DTO(obj, callback) {
  
  function on1Mcases (number) {
    if(obj.population/1000000 === 0){
      return "-"
    }
    console.log(obj)
     return  Math.round(number/(obj.population/1000000));               
  } 

  const DTO = {
    "totalCases" : obj.cases.total === null ? "-": obj.cases.total,
    "totalDeaths" : obj.deaths.total === null ? "-": obj.deaths.total,
    "totalRecoverd" : obj.cases.recovered === null ? "-": obj.cases.recovered,    
    "casesOnMillion" : obj.cases["1M_pop"] === null ? "-": obj.cases["1M_pop"],
    "deathOnMillion" : obj.deaths["1M_pop"] === null ? "-": obj.deaths["1M_pop"], 
    "recoveredOnMillion" : obj.cases.recovered === null ? "-": on1Mcases(obj.cases.recovered),    
  }
  
  return callback ? callback(DTO) : DTO
}