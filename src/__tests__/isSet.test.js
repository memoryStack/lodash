import _isSet from '../utils/isSet'

describe('_isSet()', () => {
  test('returns true when passed value is a Set object', () => {
    expect(_isSet(new Set())).toBeTruthy()
  })

  test('returns false when WeakSet value object is passed', () => {
    // Note: got to know for WeakSet for the first time while
    //    writing learning tests for isSet util
    expect(_isSet(new WeakSet())).toBeFalsy()
  })

  test('returns false when non Set value is passed', () => {
    expect(_isSet(null)).toBeFalsy()
    expect(_isSet(undefined)).toBeFalsy()
    expect(_isSet('qwerty')).toBeFalsy()
    expect(_isSet(1)).toBeFalsy()
    expect(_isSet({})).toBeFalsy()
    expect(_isSet([])).toBeFalsy()
    expect(_isSet(new Map())).toBeFalsy()
  })
})
