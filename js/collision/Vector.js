/* jshint esversion: 6 */

export class Vector {
  constructor(point) {
     if (point === undefined) {
        this.x = 0;
        this.y = 0;
     }
     else {
        this.x = point.x;
        this.y = point.y;
     }
  }

   getMagnitude() {
      return Math.sqrt(Math.pow(this.x, 2) +
                       Math.pow(this.y, 2));
   }

   dotProduct(vector) {
      return this.x * vector.x +
             this.y * vector.y;
   }

   add(vector) {
      var v = new Vector();
      v.x = this.x + vector.x;
      v.y = this.y + vector.y;
      return v;
   }

   subtract(vector) {
      var v = new Vector();
      v.x = this.x - vector.x;
      v.y = this.y - vector.y;
      return v;
   }

   normalize() {
      var v = new Vector(0, 0),
          m = this.getMagnitude();

      if (m != 0) {
         v.x = this.x / m;
         v.y = this.y / m;
      }
      return v;
   }

   perpendicular() {
      var v = new Vector();
      v.x = this.y;
      v.y = 0-this.x;
      return v;
   }

   edge(vector) {
      return this.subtract(vector);
   }

   normal() {
      var p = this.perpendicular();
      return p.normalize();
   }
}
