import _isMap from '../utils/isMap'

describe('_isMap()', () => {
  test('returns true when passed value is a Map object', () => {
    expect(_isMap(new Map())).toBeTruthy()
  })

  test('returns false when WeakMap value object is passed', () => {
    // Note: got to know for WeakMap for the first time while
    //    writing learning tests for isMap util
    expect(_isMap(new WeakMap())).toBeFalsy()
  })

  test('returns false when non Map value is passed', () => {
    expect(_isMap(null)).toBeFalsy()
    expect(_isMap(undefined)).toBeFalsy()
    expect(_isMap('qwerty')).toBeFalsy()
    expect(_isMap(1)).toBeFalsy()
    expect(_isMap({})).toBeFalsy()
    expect(_isMap([])).toBeFalsy()
    expect(_isMap(new Set())).toBeFalsy()
  })
})