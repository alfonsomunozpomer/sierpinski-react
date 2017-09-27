import PropTypes from 'prop-types'

import {EqTriangle} from './Geometry'

// Subdivide an equilateral triangle with centroid at (x, y) into three congruent equilateral triangles
const subdivideEquilateralTriangle = (t) => {
  return [
    new EqTriangle(t.centroid.x - t.sideLength / 4, t.centroid.y + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroid.x + t.sideLength / 4, t.centroid.y + (t.height / 3 - t.height / 6), t.sideLength / 2),
    new EqTriangle(t.centroid.x, t.centroid.y - t.height / 3, t.sideLength / 2)
  ]
}

// Recursively reduces (explodes) an array of eq. triangles into their congruent four triangles minus the central one
// until maxDepth; removes triangles that don’t overlap with rectangle
const sierpinski = (mainTriangle, maxDepth=6, rectangle) => {

  const _sierpinski = (ts, depth) => {
    if (ts.length === 0 || depth >= maxDepth) {
      return ts
    } else if (rectangle) {
      return _sierpinski(
        ts.reduce((acc, t) => t.overlapsRectangle(rectangle) ? acc.concat(subdivideEquilateralTriangle(t)) : acc, []),
        depth + 1)
    } else {
      return _sierpinski(
        ts.reduce((acc, t) =>  acc.concat(subdivideEquilateralTriangle(t)), []),
        depth + 1)
    }
  }

  return _sierpinski([mainTriangle], 0)
}

const sierpinskiTriangles = (x, y, l, maxDepth, rectangle) => sierpinski(new EqTriangle(x, y, l), maxDepth, rectangle)


export {sierpinskiTriangles as default}
