import _isNil from '../utils/isNil'

describe('_isNil()', () => {
  test('returns true when passed value is null or undefined', () => {
    expect(_isNil(null)).toBeTruthy()
    expect(_isNil(undefined)).toBeTruthy()
    expect(_isNil()).toBeTruthy()
  })

  test('returns false when 0 or empty string is passed', () => {
    expect(_isNil('')).toBeFalsy()
    expect(_isNil(0)).toBeFalsy()
  })

  test('returns false when non nulish value is passed', () => {
    expect(_isNil('qwerty')).toBeFalsy()
    expect(_isNil(1)).toBeFalsy()
    expect(_isNil(false)).toBeFalsy()
    expect(_isNil(NaN)).toBeFalsy()
    expect(_isNil({})).toBeFalsy()
    expect(_isNil([])).toBeFalsy()
    expect(_isNil(new Set())).toBeFalsy()
    expect(_isNil(new Map())).toBeFalsy()
  })
})
