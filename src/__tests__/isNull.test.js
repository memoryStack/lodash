import _isNull from '../utils/isNull'

describe('_isNull()', () => {
  test('returns true when passed value is null', () => {
    expect(_isNull(null)).toBeTruthy()
  })

  test('returns false when non null value is passed', () => {
    expect(_isNull(undefined)).toBeFalsy()
    expect(_isNull('qwerty')).toBeFalsy()
    expect(_isNull(1)).toBeFalsy()
    expect(_isNull({})).toBeFalsy()
    expect(_isNull([])).toBeFalsy()
    expect(_isNull(new Set())).toBeFalsy()
    expect(_isNull(new Map())).toBeFalsy()
  })
})