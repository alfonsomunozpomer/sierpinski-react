const SIN_PI_3_RAD = Math.sin(Math.PI / 3)

// Equilateral triangles are characterized by the coordinates of their centroids and a side length, with one side
// parallel to the X axis
class EqTriangle {
  constructor(centroidX, centroidY, sideLength) {
    this.centroidX = centroidX
    this.centroidY = centroidY
    this.sideLength = sideLength

    // Vertices of equilateral triangle with centroid at (x, y) and side of length l
    const height = SIN_PI_3_RAD * sideLength
    const vertex1 = [centroidX - sideLength / 2, centroidY + height / 3]
    const vertex2 = [centroidX, centroidY - 2 * height / 3]
    const vertex3 = [centroidX + sideLength / 2, centroidY + height / 3]

    this.height = height
    this.vertices = [vertex1, vertex2, vertex3]
  }

  get path2D() {
    const trianglePath = new Path2D()
    trianglePath.moveTo(...this.vertices[0])
    trianglePath.lineTo(...this.vertices[1])
    trianglePath.lineTo(...this.vertices[2])
    return trianglePath
  }
}

export default EqTriangle
