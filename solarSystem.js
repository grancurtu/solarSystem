const mathjs = require('mathjs');
const algebra = require('./algebra');


class SolarSystem{

  constructor(){
    this.ferengi = {
      radius: 500, //km
      //1 deg/day  => pi/180/day => pi/180/24h 
      angularVelocity: -mathjs.divide(mathjs.pi,180)
    }
    
    this.betasoide = {
      radius: 2000, //km
      //3deg/day  => (3*pi/180)/day => (3*pi/180)/24h  
      angularVelocity: -mathjs.divide(3*mathjs.pi,180)
    }
    
    this.vulcano = {
      radius: 1000, //km
      // 5deg/day  => (5*pi/180)/day => (5*pi/180)/24h
      angularVelocity: mathjs.divide(5*mathjs.pi,180)
    }
  
    this.SEASONS = {
      drought: 1,
      optimal: 2,
      normal: 3,
      rain: 4
    }
  }

  positionForOn(aPlanet,aDay){
    return {
      x: mathjs.round(aPlanet.radius * mathjs.cos(aPlanet.angularVelocity*aDay),2),
      y: mathjs.round(aPlanet.radius * mathjs.sin(aPlanet.angularVelocity*aDay),2)
    }
  }

  getWheaterCondition(aDay){
    let ferengiPosition = this.positionForOn(this.ferengi,aDay);
    let betasoidePosition = this.positionForOn(this.betasoide,aDay);
    let vulcanoPosition= this.positionForOn(this.vulcano,aDay);

    // console.log('ferengi: ', ferengiPosition);
    // console.log('betasoide: ', betasoidePosition);
    // console.log('vulcano: ', vulcanoPosition);
    let triangleArea = mathjs.round(algebra.triangleArea(ferengiPosition,betasoidePosition,vulcanoPosition),2);
    if(triangleArea >0){
      //is a triangle so we look if the sun is inside
      if(algebra.pointInTriangle({x:0,y:0},ferengiPosition,betasoidePosition,vulcanoPosition)){
        //is going to rain
        return {season:this.SEASONS.rain,triangleArea: triangleArea};
      }else{
        //normal conditions of pressure and temperature
        return {season:this.SEASONS.normal,triangleArea: triangleArea};
      }
    }else{
      //planets aligned look if the sun is in line
      if(algebra.pointInLineByEq({x:0,y:0},ferengiPosition,betasoidePosition)){
        //drought
        return {season:this.SEASONS.drought,triangleArea: 0};
      }else{
        //optimal conditions of pressure and temperature
        return {season:this.SEASONS.optimal,triangleArea: 0};
      }
    }
  }
  
}

module.exports = SolarSystem;