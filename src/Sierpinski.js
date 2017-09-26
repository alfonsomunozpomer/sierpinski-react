import PropTypes from 'prop-types'

import EqTriangle from './EqTriangle'

// Subdivide an equilateral triangle with centroid at (x, y) into three congruent equilateral triangles
const subdivideEquilateralTriangle = (t) => {
  return [
    new EqTriangle(t.centroidX - t.sideLength / 4, t.centroidY + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroidX + t.sideLength / 4, t.centroidY + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroidX, t.centroidY - t.height / 3, t.sideLength / 2)
  ]
}

// Creates a Sierpinski triangle with the shape of the equilateral triangle mainTriangle until the side length of the
// smallest triangles is less than l pixels
const sierpinski = (mainTriangle, l = 10) => {

  // Recursively reduces (explodes) an array of eq. triangles into their congruent four triangles minus the central one
  // until their side length is less than l pixels
  const _sierpinski = (ts) => {
    if (ts[0].sideLength < l) {
      return ts
    } else {
      return _sierpinski(ts.reduce((acc, t) => acc.concat(subdivideEquilateralTriangle(t)), []))
    }
  }

  return _sierpinski([mainTriangle])
}

// Paths of a Sierpinski triangle with centroid at (x,y), parallel to the X axis, with side length l
const sierpinskiPaths = (x, y, l, limit) => sierpinski(new EqTriangle(x, y, l), limit).map((t) => t.path2D)

const testSubject = (x, y, l) => sierpinski(new EqTriangle(x, y, l))

export {sierpinskiPaths as default, testSubject}
