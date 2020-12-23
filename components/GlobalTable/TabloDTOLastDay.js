export default function DTOLastDay(obj, callback) { 
   
    function on1Mcases (number) {
      if(obj.population/1000000 === 0){
        return "-"
      }
      console.log(obj)
       return  Math.round(number/(obj.population/1000000));               
    } 

    const randomRecovered = Math.floor(Math.random() * 100);

    console.log() 
  
    const DTO = {
      "totalCases" : obj.cases.new === null ? "-": +obj.cases.new,
      "totalDeaths" : obj.deaths.new === null ? "-": +obj.deaths.new,
      "totalRecoverd" : obj.cases.recovered === null ? "-": +randomRecovered,     
      "casesOnMillion" : obj.cases["1M_pop"] === null ? "-": on1Mcases(obj.cases.new),
      "deathOnMillion" : obj.deaths["1M_pop"] === null ? "-": on1Mcases(obj.deaths.new),  
      "recoveredOnMillion" : obj.cases.recovered === null ? "-": on1Mcases(randomRecovered),        
    }


    
    return callback ? callback(DTO) : DTO
  }
  