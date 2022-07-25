import _isBoolean from '../utils/isBoolean'

describe('_isBoolean()', () => {
  test('returns true when a boolean primitive or object is passed', () => {
    expect(_isBoolean(true)).toBeTruthy()
    expect(_isBoolean(false)).toBeTruthy()
    expect(_isBoolean(new Boolean(true))).toBeTruthy()
  })

  test('returns false when non boolean value is passed', () => {
    expect(_isBoolean(null)).toBeFalsy()
    expect(_isBoolean(undefined)).toBeFalsy()
    expect(_isBoolean('qwerty')).toBeFalsy()
    expect(_isBoolean(1)).toBeFalsy()
    expect(_isBoolean({})).toBeFalsy()
    expect(_isBoolean([])).toBeFalsy()
  })
})