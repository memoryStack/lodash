import _isObject from '../utils/isObject'

describe('_isObject()', () => {
  test('returns true when passed value is an object type', () => {
    expect(_isObject({})).toBeTruthy()
    expect(_isObject([])).toBeTruthy()
    expect(_isObject(new Set())).toBeTruthy()
    expect(_isObject(new Map())).toBeTruthy()
    expect(_isObject(new Number(1))).toBeTruthy()
    expect(_isObject(new Boolean(true))).toBeTruthy()
    expect(_isObject(new String())).toBeTruthy()
  })

  test('returns false for primite values', () => {
    expect(_isObject(null)).toBeFalsy()
    expect(_isObject(undefined)).toBeFalsy()
    expect(_isObject(1)).toBeFalsy()
    expect(_isObject('qwerty')).toBeFalsy()
    expect(_isObject(false)).toBeFalsy()
  })
})
