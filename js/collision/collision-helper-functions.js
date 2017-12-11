/* jshint esversion: 6 */

import { Vector } from './Vector';
import { Point } from './Point';

function getPolygonPointClosestToCircle(polygon, circle) {
   var min = 10000,
       length,
       testPoint,
       closestPoint;

   for (var i=0; i < polygon.points.length; ++i) {
      testPoint = polygon.points[i];
      length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2),
                         Math.pow(testPoint.y - circle.y, 2));
      if (length < min) {
         min = length;
         closestPoint = testPoint;
      }
   }

   return closestPoint;
}

export function polygonCollidesWithCircle(polygon, circle) {
   var min=10000, v1, v2,
       edge, perpendicular,
       axes = polygon.getAxes(),
       closestPoint = getPolygonPointClosestToCircle(polygon, circle);

   v1 = new Vector(new Point(circle.x, circle.y));
   v2 = new Vector(new Point(closestPoint.x, closestPoint.y));

   axes.push(v1.subtract(v2).normalize());

   return !polygon.separationOnAxes(axes, circle);
}
