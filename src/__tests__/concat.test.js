const _concat = require('lodash/concat')

describe('_concat()', () => {
  test('returns a new array even when there is nothing to concate', () => {
    const array = [1, 2, 3]

    expect(_concat(array)).not.toBe(array)
    expect(_concat(array)).toStrictEqual(array)
  })

  test('returns an array after concatenating all the values with the original array', () => {
    const array = [1, 2, 3]

    expect(_concat(array, 0, -1, null, [1, 2, 3], [4, 5])).toStrictEqual([1, 2, 3, 0, -1, null, 1, 2, 3, 4, 5])
  })

  test('concatenates upto 1 level deep only, if some value had nested arrays then elements of outermost array are inlined for concatenation', () => {
    const array = [1, 2, 3]

    expect(_concat(array, [1, [2], 3])).toStrictEqual([1, 2, 3, 1, [2], 3])
  })

  test('returns an array after concatenating all the values in an empty array if first argument is not an array', () => {

    expect(_concat(null)).toStrictEqual([null])
    expect(_concat(null, undefined)).toStrictEqual([null, undefined])
    expect(_concat(null, 1, 2, 3)).toStrictEqual([null, 1, 2, 3])
  })

  test('doesnt consider first array argument as an array if string is passed. (unlike _chunk util)', () => {
    expect(_concat('qwerty', null)).toStrictEqual(['qwerty', null])
  })

  test('returns an empty array is nothing is passed', () => {
    expect(_concat()).toStrictEqual([])
  })

})