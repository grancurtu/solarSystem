const mathjs = require('mathjs');


function convert(point){
   return [point.x,point.y,0];
}

/*
 Three point in a plane form a triangle or they are alined, so if the area of the triangle they should form is zero then they are on a line not a triangle. 
*/
exports.triangleArea = (pointA,pointB,pointC) => {
  return Math.abs((pointA.x * (pointB.y - pointC.y) + pointB.x * (pointC.y - pointA.y) + pointC.x * (pointA.y - pointB.y)) / 2);
}

/**
 * ad hoc method to see if two points are on the same side of a line defined by [A-B] 
 */
function sameSide(p1,p2, a,b){
  //b-a
  let b_a = convert({x:b.x-a.x,y:b.y-a.y});
  //p1-a
  let p1_a = convert({x:p1.x-a.x,y:p1.y-a.y});
  //p2-a
  let p2_a = convert({x:p2.x-a.x,y:p2.y-a.y});
  let cp1 = mathjs.cross(b_a, p1_a);
  let cp2 = mathjs.cross(b_a, p2_a);
  
  return (mathjs.dot(cp1, cp2) >= 0)
}

/**
 * given a tirangle defined by 3 points [ABC] answers if a point p is inside of it or not
 * basicale uses the ad hoc functon to see if the point p is in the same side than a vertex from (ie: A) the line defined by the orther vertex [B-C]
 */
exports.pointInTriangle = (p, vertexA, vertexB, vertexC) => {
  if (sameSide(p,vertexA,vertexB,vertexC) && sameSide(p,vertexB,vertexA,vertexC) && sameSide(p,vertexC,vertexA,vertexB) ){
    return true 
  }else{
    return false
  }
}

function getSlope(pointA,pointB){
  let xChange = pointA.x-pointB.x;
  if(xChange===0){
    return { 
      slope: null,
      vertical:true
    };    
  }
  return {
    slope: mathjs.divide(pointA.y-pointB.y,xChange),
    vertical: false
  };

}

exports.pointInLineByEq = (p, pointA,pointB) => {
  let slope = getSlope(pointA,pointB);
  if(slope.vertical){
    return p.x === pointA.x;
  }else{
    return (p.y-pointA.y)===(slope.slope*(p.x-pointA.x));
  }
}

