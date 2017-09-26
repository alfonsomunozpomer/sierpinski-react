import {testSubject} from '../src/Sierpinski'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
const MIN = 100  // To make sure we don’t get back just the main triangle
const MAX = 1000

const testRuns = 100

describe(`Sierpinski triangle`, () => {
  test(`has a multiple of 3 triangles`, () => {
    for (let i = 0 ; i < testRuns ; i++) {
      const results =
        testSubject(getRandomArbitrary(MIN, MAX), getRandomArbitrary(MIN, MAX), getRandomArbitrary(MIN, MAX))

      expect(results.length % 3).toBe(0)
    }
  })
})
