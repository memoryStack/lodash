import _isFunction from '../utils/isFunction'

describe('_isFunction()', () => {
  test('returns true when function is passed', () => {
    expect(_isFunction(() => { })).toBeTruthy()
  })

  test('returns false when non function value is passed', () => {
    expect(_isFunction(null)).toBeFalsy()
    expect(_isFunction(undefined)).toBeFalsy()
    expect(_isFunction('qwerty')).toBeFalsy()
    expect(_isFunction(1)).toBeFalsy()
    expect(_isFunction({})).toBeFalsy()
    expect(_isFunction([])).toBeFalsy()
  })
})