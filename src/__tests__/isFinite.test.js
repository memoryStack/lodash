import _isFinite from '../utils/isFinite'

describe('_isFinite()', () => {
  test('returns true when passed value is finite number', () => {
    expect(_isFinite(1)).toBeTruthy()
    expect(_isFinite(Number.MAX_VALUE)).toBeTruthy()
    expect(_isFinite(1.2)).toBeTruthy()
  })

  test('returns false when passed value is number object even though value is finite', () => {
    expect(_isFinite(new Number(1))).toBeFalsy()
  })

  test('returns false for infinity', () => {
    expect(_isFinite(Infinity)).toBeFalsy()
  })

  test('returns false for NaN', () => {
    expect(_isFinite(NaN)).toBeFalsy()
  })

  test('returns false when passed value is string but its value is a finite number', () => {
    expect(_isFinite('1')).toBeFalsy()
    expect(_isFinite('1.2')).toBeFalsy()
  })

  test('returns false when non number value is passed', () => {
    expect(_isFinite(null)).toBeFalsy()
    expect(_isFinite(undefined)).toBeFalsy()
    expect(_isFinite('qwerty')).toBeFalsy()
    expect(_isFinite({})).toBeFalsy()
    expect(_isFinite([])).toBeFalsy()
  })
})