const SolarSystem = require('./solarSystem');

let solarSystem = new SolarSystem();

const PREDICTION_DAYS = 3650;

let results = {
  periodos_sequia: 0,
  periodos_lluvia: 0,
  dia_mas_lluvia: 0,
  periodos_optimos: 0
}

let maxTriangleArea = 0;
let previousSeason = null;


for(let d = 0; d<PREDICTION_DAYS;d++){
  // console.log('Conditions for day: '+ (d+1));
  let condition = solarSystem.getWheaterCondition(d);
  if(condition.season===solarSystem.SEASONS.rain && maxTriangleArea<condition.triangleArea){
    // console.log('day: '+ d + ' maxTriangleArea: ' + maxTriangleArea + ' condition.triangleArea: ' +condition.triangleArea);
    maxTriangleArea = condition.triangleArea;
    results.dia_mas_lluvia = d+1;
  }
  if(condition.season!=previousSeason){
    switch(condition.season){
      case solarSystem.SEASONS.drought:
        results.periodos_sequia++;
        break; 
      case solarSystem.SEASONS.rain:
        results.periodos_lluvia++;
        break; 
      case solarSystem.SEASONS.optimal:
        results.optimalSeasons++;
        break;
      default:
        break;
    }
    previousSeason = condition.season;
  }
}


console.log('Dias: ' + PREDICTION_DAYS)
console.log('Resultados: ',JSON.stringify(results));