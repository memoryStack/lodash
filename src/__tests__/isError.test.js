import _isError from '../utils/isError'

describe('_isError(object)', () => {
  test('returns true when an error object of any type is passed', () => {
    expect(_isError(new Error('error'))).toBeTruthy()
    expect(_isError(new URIError('error'))).toBeTruthy()
    expect(_isError(new RangeError('error'))).toBeTruthy()
    expect(_isError(new ReferenceError('error'))).toBeTruthy()
    expect(_isError(new TypeError('error'))).toBeTruthy()
    expect(_isError(new SyntaxError('error'))).toBeTruthy()
  })

  test('returns false when anything but non error object is passed', () => {
    expect(_isError(1)).toBeFalsy()
    expect(_isError('qwerty')).toBeFalsy()
    expect(_isError({})).toBeFalsy()
    expect(_isError(null)).toBeFalsy()
    expect(_isError(undefined)).toBeFalsy()
    expect(_isError([])).toBeFalsy()
    expect(_isError(new Set())).toBeFalsy()
    expect(_isError(new Map())).toBeFalsy()
  })
})