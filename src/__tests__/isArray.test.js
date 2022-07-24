import _isArray from '../utils/isArray'

describe('_isArray()', () => {
  test('returns true if passed value is an array', () => {
    expect(_isArray([1, 2])).toBeTruthy()
  })

  test('returns false if passed value is other than array including a non empty string', () => {
    expect(_isArray(null)).toBeFalsy()
    expect(_isArray(undefined)).toBeFalsy()
    expect(_isArray(NaN)).toBeFalsy()
    expect(_isArray(1)).toBeFalsy()
    expect(_isArray({})).toBeFalsy()
    expect(_isArray(jest.fn())).toBeFalsy()
    expect(_isArray('')).toBeFalsy()
    expect(_isArray('qwerty')).toBeFalsy()
    expect(_isArray(new Set())).toBeFalsy()
    expect(_isArray(new Map())).toBeFalsy()
  })

})