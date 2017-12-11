/* jshint esversion: 6 */

import { Point } from './Point';
import { Vector } from './Vector';
import { Shape } from './Shape';
import { Projection } from './Projection';
import { polygonCollidesWithCircle } from './collision-helper-functions';

export class Circle extends Shape {
  constructor(x, y, radius) {
     super();
     this.x = x;
     this.y = y;
     this.radius = radius;
  }

  collidesWith(shape) {
     var point, length, min=10000, v1, v2,
         edge, perpendicular, normal,
         axes = shape.getAxes(), distance;

     if (axes === undefined) {  // circle
        distance = Math.sqrt(Math.pow(shape.x - this.x, 2) +
                             Math.pow(shape.y - this.y, 2));

        return distance < Math.abs(this.radius + shape.radius);
     }
     else {  // polygon
        return polygonCollidesWithCircle(shape, this);
     }
  }

  getAxes() {
     return undefined; // there are an infinite number of axes for circles
  }

  project(axis) {
     var scalars = [],
         point = new Point(this.x, this.y),
         dotProduct = new Vector(point).dotProduct(axis);

     scalars.push(dotProduct);
     scalars.push(dotProduct + this.radius);
     scalars.push(dotProduct - this.radius);

     return new Projection(Math.min.apply(Math, scalars),
                           Math.max.apply(Math, scalars));
  }
}
