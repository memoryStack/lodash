import _difference from '../utils/difference'

describe('_difference()', () => {

  test('returns a new array even when filtered array is same', () => {
    const array = [2, 1]

    expect(_difference(array)).not.toBe(array)
    expect(_difference(array)).toStrictEqual(array)
  })

  test('returns a new array with elements from first array if those elements are not present in second array', () => {
    expect(_difference([2, 1], [2, 3])).toStrictEqual([1])
  })

  test('returns a new array with elements from first array if those elements are not present in second array', () => {
    expect(_difference([2, 1], [2, 3])).toStrictEqual([1])
    expect(_difference([2, 1, 2], [2, 3])).toStrictEqual([1])
    expect(_difference([2, 1, 2])).toStrictEqual([2, 1, 2])
  })

  test('(NaN === NaN) = false, but still this function performs equality check and weed it out', () => {
    /*
      read below article to understand the equality comparison used by this util
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness  
        https://262.ecma-international.org/7.0/#sec-samevaluezero
    */

    const object = {}
    expect(_difference([2, 1, 2, object, null, NaN], [{}, NaN])).toStrictEqual([2, 1, 2, object, null])
  })

  test('returns an empty array when first array is not an array', () => {
    expect(_difference()).toStrictEqual([])
    expect(_difference(null, [1, 2, 3])).toStrictEqual([])
    expect(_difference(undefined, [1, 2, 3])).toStrictEqual([])
    expect(_difference(1, [1, 2, 3])).toStrictEqual([])
    expect(_difference('qwerty', [1, 2, 3])).toStrictEqual([])
  })

})