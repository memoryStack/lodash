import _isInteger from '../utils/isInteger'

describe('_isInteger()', () => {
  test('returns true when passed value is number primitive', () => {
    expect(_isInteger(1)).toBeTruthy()
  })

  test('returns false when passed value is number object', () => {
    expect(_isInteger(new Number(1))).toBeFalsy()
  })

  test('returns false when string is passed but value is integer', () => {
    expect(_isInteger('1')).toBeFalsy()
  })

  test('returns true for max number value', () => {
    expect(_isInteger(Number.MAX_VALUE)).toBeTruthy()
  })

  test('returns false for some constants from number class', () => {
    expect(_isInteger(Number.MIN_VALUE)).toBeFalsy()
    expect(_isInteger(Infinity)).toBeFalsy()
  })

  test('returns false when non integer value is passed', () => {
    expect(_isInteger(null)).toBeFalsy()
    expect(_isInteger(undefined)).toBeFalsy()
    expect(_isInteger('qwerty')).toBeFalsy()
    expect(_isInteger(1.2)).toBeFalsy()
    expect(_isInteger({})).toBeFalsy()
    expect(_isInteger([])).toBeFalsy()
  })
})