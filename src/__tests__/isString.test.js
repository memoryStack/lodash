import _isString from '../utils/isString'

describe('_isString()', () => {
  test('returns true when passed value is a string primitive or value object', () => {
    expect(_isString('')).toBeTruthy()
    expect(_isString('qwerty')).toBeTruthy()
    expect(_isString(new String())).toBeTruthy()
  })

  test('returns false for primite values', () => {
    expect(_isString(null)).toBeFalsy()
    expect(_isString(undefined)).toBeFalsy()
    expect(_isString(false)).toBeFalsy()
    expect(_isString(1)).toBeFalsy()
    expect(_isString({})).toBeFalsy()
    expect(_isString([])).toBeFalsy()
    expect(_isString(new Set())).toBeFalsy()
    expect(_isString(new Map())).toBeFalsy()
  })
})
