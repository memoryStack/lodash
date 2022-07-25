import _matchesProperty from '../utils/matchesProperty'
import _isFunction from '../utils/isFunction'

describe('_matchesProperty(path, srcValue)', () => {
  test('returns a function', () => {
    expect(_isFunction(_matchesProperty('', ''))).toBeTruthy()
  })

  test('returns true when in value matches at the given path in given object', () => {
    const propertyMatcher = _matchesProperty('a', 1)

    expect(propertyMatcher({ a: 1, b: 2 })).toBeTruthy()
  })

  test('returns false when in value matches at the given path in given object', () => {
    const propertyMatcher = _matchesProperty('a', 2)

    expect(propertyMatcher({ a: 1, b: 2 })).toBeFalsy()
  })

  test('accepts path as string or in array formats', () => {
    const stringPathPropertyMatcher = _matchesProperty('a', 2)
    const arrayPathPropertyMatcher = _matchesProperty(['a'], 2)

    expect(stringPathPropertyMatcher({ a: 2, b: 2 })).toBeTruthy()
    expect(arrayPathPropertyMatcher({ a: 2, b: 2 })).toBeTruthy()
  })

  test('returns false when path doesnt exist in given object', () => {
    const propertyMatcher = _matchesProperty('a.b', 2)

    expect(propertyMatcher({ a: 1 })).toBeFalsy()
  })

  test('matches given values partially to srcValue, i.e given object value at key must have atleast all the keys which are present in srcValue', () => {
    const propertyMatcher = _matchesProperty('a', { c: 2 })
    expect(propertyMatcher({ a: { b: 2, c: 2 } })).toBeTruthy()
  })

  test('returns false when srcValue is empty object but value in given object at given key is not an object (differs with _matches() in this use-case)', () => {
    const propertyMatcher = _matchesProperty('a', {})

    expect(propertyMatcher({ a: [] })).toBeFalsy()
    expect(propertyMatcher({ a: 1 })).toBeFalsy()
  })

  test('returns false when srcValue is empty array but value in given object at given key is not an array (differs with _matches() in this use-case)', () => {
    const propertyMatcher = _matchesProperty('a', [])

    expect(propertyMatcher({ a: {} })).toBeFalsy()
    expect(propertyMatcher({ a: 1 })).toBeFalsy()
    expect(propertyMatcher({ a: 'qwerty' })).toBeFalsy()
    expect(propertyMatcher({ a: true })).toBeFalsy()
  })

  test('compares array values partially unlike _matches() util', () => {
    const propertyMatcher = _matchesProperty('a', [1, 2])

    expect(propertyMatcher({ a: [1, 2, 3] })).toBeTruthy()
  })
})
