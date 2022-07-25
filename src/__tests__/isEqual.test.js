import _isEqual from '../utils/isEqual'

/*
  Note: This method supports comparing arrays, array buffers, booleans, date objects,
    error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
    Object objects are compared by their own, not inherited, enumerable properties.
    Functions and DOM nodes are compared by strict equality, i.e. ===.
*/

// TODO: write tests for each of the values types mentioned above

describe('_isEqual()', () => {
  test('returns true when two values are equivalent', () => {
    const valueA = { a: '1' }
    const valueB = { a: '1' }

    expect(_isEqual(valueA, valueB)).toBeTruthy()
    expect(_isEqual([1, 2], [1, 2])).toBeTruthy()
  })

  test('returns false when a number and a string are compared having same value', () => {
    expect(_isEqual(1, '1')).toBeFalsy()
  })

  test('returns true when a primitive and a string object are compared having same value', () => {
    expect(_isEqual(new String('1'), '1')).toBeTruthy()
  })

  test('returned true when NaNs are compared', () => {
    expect(_isEqual(NaN, NaN)).toBeTruthy()
  })
})