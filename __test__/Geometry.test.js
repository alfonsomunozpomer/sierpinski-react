import {Point, EqTriangle, Rectangle} from '../src/Geometry'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
const MAX = 1000

const testRuns = 100

describe(`Equilateral triangles`, () => {
  test(`are fine with positive coordinates`, () => {
    for (let i = 0 ; i < testRuns ; i++) {
      const centroidX = getRandomArbitrary(0, MAX)
      const centroidY = getRandomArbitrary(0, MAX)
      const sideLength = getRandomArbitrary(0, MAX)
      const subject = new EqTriangle(centroidX, centroidY, sideLength)
      expect(subject.centroid.x).toBe(centroidX)
      expect(subject.centroid.y).toBe(centroidY)
      expect(subject.sideLength).toBe(sideLength)
      expect(subject.height).toBe(Math.sin(Math.PI / 3) * sideLength)
      expect(subject.points).toHaveLength(3)
    }
  })

  test(`overlaps overlapping rectangle`, () => {
    const eqTriangle = new EqTriangle(10, 10, 5)
    const overlappingRectangle = new Rectangle(10, 10, 20, 20)
    expect(eqTriangle.overlapsRectangle(overlappingRectangle)).toBeTruthy()
  })

  test(`does not overlap rectangle`, () => {
    const eqTriangle = new EqTriangle(10, 10, 5)
    const overlappingRectangle = new Rectangle(20, 20, 30, 30)
    expect(eqTriangle.overlapsRectangle(overlappingRectangle)).toBeFalsy()
  })
})
