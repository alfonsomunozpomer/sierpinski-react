import EqTriangle from '../src/EqTriangle'

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
      expect(subject.centroidX).toBe(centroidX)
      expect(subject.centroidY).toBe(centroidY)
      expect(subject.sideLength).toBe(sideLength)
      expect(subject.height).toBe(Math.sin(Math.PI / 3) * sideLength)
      expect(subject.vertices).toHaveLength(3)
    }
  })
})
