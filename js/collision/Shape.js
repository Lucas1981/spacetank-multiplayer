/* jshint esversion: 6 */

export class Shape {
   constructor() {
     this.x = undefined;
     this.y = undefined;
   }

   collidesWith(shape) {
      var axes = this.getAxes().concat(shape.getAxes());
      return !this.separationOnAxes(axes, shape);
   }

   separationOnAxes(axes, shape) {
      for (var i=0; i < axes.length; ++i) {
         var axis = axes[i];
         var projection1 = shape.project(axis);
         var projection2 = this.project(axis);

         if (! projection1.overlaps(projection2)) {
            return true; // don't have to test remaining axes
         }
      }
      return false;
   }

   move(dx, dy) {
      throw 'move(dx, dy) not implemented';
   }

   createPath(context) {
      throw 'createPath(context) not implemented';
   }

   getAxes() {
      throw 'getAxes() not implemented';
   }

   project(axis) {
      throw 'project(axis) not implemented';
   }
}
