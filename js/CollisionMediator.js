/* jshint esversion: 6 */

import { Circle } from '../../lib/Circle';
import { Polygon } from '../../lib/Polygon';

export class CollisionMediator {
  constructor() {

  }

  bulletCollidesWithTank(bullet, tank) {

    let points = tank.getRotatedAndTransformedPoints();
    let circle = new Circle(bullet.getX(), bullet.getY(), bullet.getRadius());
    let firstPolygon = new Polygon();
    let secondPolygon = new Polygon();

    firstPolygon.addPoint(points[0].x, points[0].y);
    firstPolygon.addPoint(points[1].x, points[1].y);
    firstPolygon.addPoint(points[2].x, points[2].y);

    secondPolygon.addPoint(points[0].x, points[0].y);
    secondPolygon.addPoint(points[2].x, points[2].y);
    secondPolygon.addPoint(points[3].x, points[3].y);

    if(circle.collidesWith(firstPolygon) || circle.collidesWith(secondPolygon)) return true;

    return false;

  }
}
