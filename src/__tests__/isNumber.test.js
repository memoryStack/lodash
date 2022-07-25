import _isNumber from '../utils/isNumber'

describe('_isNumber()', () => {
  test('returns true when a number value is passed', () => {
    expect(_isNumber(1)).toBeTruthy()
    expect(_isNumber(1.2)).toBeTruthy()
  })

  test('returns true when number object value is passed', () => {
    expect(_isNumber(new Number(1))).toBeTruthy()
  })

  test('returns true for NaN and Infinity', () => {
    expect(_isNumber(NaN)).toBeTruthy()
    expect(_isNumber(Infinity)).toBeTruthy()
  })

  test('returns false when string is passed which has a number convertible value', () => {
    expect(_isNumber('1')).toBeFalsy()
  })

  test('returns false when non nulish value is passed', () => {
    expect(_isNumber('qwerty')).toBeFalsy()
    expect(_isNumber(false)).toBeFalsy()
    expect(_isNumber({})).toBeFalsy()
    expect(_isNumber([])).toBeFalsy()
    expect(_isNumber(new Set())).toBeFalsy()
    expect(_isNumber(new Map())).toBeFalsy()
  })
})
