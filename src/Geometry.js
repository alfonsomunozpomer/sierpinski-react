const SIN_PI_3_RAD = Math.sin(Math.PI / 3)

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

// Equilateral triangles are characterized by the coordinates of their centroids and a side length, with one side
// parallel to the X axis
class EqTriangle {
  constructor(centroidX, centroidY, sideLength) {
    this.centroid = new Point(centroidX, centroidY)
    this.sideLength = sideLength

    // Vertices of equilateral triangle with centroid at (x, y) and side of length l
    //
    //           point2
    //             *
    //            ***
    //           *****
    //          *******
    //         *********
    //        ***********
    //     point1      point3
    //
    const height = SIN_PI_3_RAD * sideLength
    const point1 = new Point(this.centroid.x - sideLength / 2, this.centroid.y + height / 3)
    const point2 = new Point(this.centroid.x, this.centroid.y - 2 * height / 3)
    const point3 = new Point(this.centroid.x + sideLength / 2, this.centroid.y + height / 3)

    this.height = height
    this.points = [point1, point2, point3]
  }

  overlapsRectangle(rectangle) {
    return !(this.points[2].x < rectangle.topLeft.x ||
             this.points[0].x > rectangle.bottomRight.x ||
             this.points[0].y < rectangle.topLeft.y ||
             this.points[1].y > rectangle.bottomRight.y)
  }
}

class Rectangle {
  constructor(left, top, right, bottom) {
    this.topLeft = new Point(left, top)
    this.bottomRight = new Point(right, bottom)
  }

  toString() {
    return `(${this.topLeft.x}, ${this.topLeft.y}) (${this.bottomRight.x}, ${this.bottomRight.y})`
  }
}

export {Point, EqTriangle, Rectangle}
