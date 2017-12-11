/* jshint esversion: 6 */

import { Point } from './Point';
import { Projection } from './Projection';
import { Shape } from './Shape';
import { Vector } from './Vector';
import { polygonCollidesWithCircle } from './collision-helper-functions';

export class Polygon extends Shape {
  constructor() {
    super();
    this.points = [];
  }

  collidesWith(shape) {
     var axes = shape.getAxes();

     if (axes === undefined) {
        return polygonCollidesWithCircle(this, shape);
     }
     else {
        axes.concat(this.getAxes());
        return !this.separationOnAxes(axes, shape);
     }
  }

  getAxes() {
     var v1, v2, edge, perpendicular, normal, axes = [];

     for (var i=0; i < this.points.length-1; i++) {
        v1 = new Vector(this.points[i]);
        v2 = new Vector(this.points[i+1]);
        axes.push(v1.edge(v2).normal());
     }

     v1 = new Vector(this.points[this.points.length-1]);
     v2 = new Vector(this.points[0]);
     axes.push(v1.edge(v2).normal());

     return axes;
  }

  project(axis) {
     var scalars = [];

     this.points.forEach( function (point) {
        scalars.push(new Vector(point).dotProduct(axis));
     });

     return new Projection(Math.min.apply(Math, scalars),
                           Math.max.apply(Math, scalars));
  }

  addPoint(x, y) {
     this.points.push(new Point(x,y));
  }
}
