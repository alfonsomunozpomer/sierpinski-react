import {testSubject} from '../src/Sierpinski'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
const MAX = 1000

const testRuns = 100

describe(`Sierpinski triangle`, () => {
  test(`has a multiple of 3 triangles`, () => {
    for (let i = 0 ; i < testRuns ; i++) {
      expect(
        testSubject(getRandomArbitrary(0, MAX), getRandomArbitrary(0, MAX), getRandomArbitrary(0, MAX)).length % 3)
        .toBe(0)
    }
  })
})
