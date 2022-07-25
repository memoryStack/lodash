import _isUndefined from '../utils/isUndefined'

describe('_isUndefined()', () => {
  test('returns true when passed value is undefined', () => {
    expect(_isUndefined(undefined)).toBeTruthy()
  })

  test('returns true when nothing is passed', () => {
    expect(_isUndefined()).toBeTruthy()
  })

  test('one more representation of undefined', () => {
    expect(_isUndefined(void 0)).toBeTruthy()
  })

  test('returns false for other values than undefined', () => {
    expect(_isUndefined(null)).toBeFalsy()
    expect(_isUndefined(false)).toBeFalsy()
    expect(_isUndefined(1)).toBeFalsy()
    expect(_isUndefined('qwerty')).toBeFalsy()
    expect(_isUndefined('')).toBeFalsy()
    expect(_isUndefined({})).toBeFalsy()
    expect(_isUndefined([])).toBeFalsy()
    expect(_isUndefined(new Set())).toBeFalsy()
    expect(_isUndefined(new Map())).toBeFalsy()
  })
})
