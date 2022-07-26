import _toLength from '../utils/toLength'

describe('_toLength()', () => {
  /*
    Note: returns an integer value for passed value and the
        returned value can be used as a length of array like DS.
      I wonder who uses this util.
   */

  test('returns non negative integer as it is', () => {
    expect(_toLength(1)).toBe(1)
    expect(_toLength(132)).toBe(132)
    expect(_toLength(0)).toBe(0)
  })

  test('returns lower integer for +ve fractions', () => {
    expect(_toLength(1.2)).toBe(1)
    expect(_toLength(.2)).toBe(0)
  })

  test('returns 0 for negative numbers', () => {
    expect(_toLength(-1)).toBe(0)
    expect(_toLength(-0.3)).toBe(0)
    expect(_toLength(-1.2)).toBe(0)
  })

  test('strings with number values will be treated as numbers', () => {
    expect(_toLength('1')).toBe(1)
    expect(_toLength('1.2')).toBe(1)
    expect(_toLength('-1.2')).toBe(0)
  })

  test('returns 0 for alphabetical strings', () => {
    expect(_toLength('1a')).toBe(0)
  })

  test('returns corresponding integer values for boolean values', () => {
    expect(_toLength(false)).toBe(0)
    expect(_toLength(true)).toBe(1)
  })

  test('returns 0 for values which can not be converted to integer anyhow', () => {
    expect(_toLength({})).toBe(0)
    expect(_toLength(undefined)).toBe(0)
    expect(_toLength([])).toBe(0)
    expect(_toLength(new Map())).toBe(0)
    expect(_toLength(new Set())).toBe(0)
  })
})