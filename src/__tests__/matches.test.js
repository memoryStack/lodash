import _matches from '../utils/matches'
import _isFunction from '../utils/isFunction'

/*
  Note: based on the below test cases looks like it's better to use it when
      source object is object or array which have some values in them
      for array also it's better to use _isEqual() rather than this util
      because in arrays partial comparison doesn't work like in objects
*/

describe('_matches(sourceObject)', () => {
  test('returns a function', () => {
    const sourceObject = { a: 1 }
    expect(_isFunction(_matches(sourceObject))).toBeTruthy()
  })

  test('returns true when passed object is equal to the source object', () => {
    const sourceObject = { a: 1 }
    const matcher = _matches(sourceObject)
    expect(matcher({ a: 1 })).toBeTruthy()
    expect(_matches([])([])).toBeTruthy()
  })

  test('matches source object partially, whatever source has, atleast those values must be present in targetted object', () => {
    const sourceObject = { a: 1 }
    const matcher = _matches(sourceObject)
    expect(matcher({ a: 1, b: 2 })).toBeTruthy()
  })

  test('returns false when passed object is not equal to the source object on common properties', () => {
    const matcher = _matches({ a: 1 })

    expect(matcher({ a: 2 })).toBeFalsy()
    expect(matcher({ a: '1' })).toBeFalsy()
  })

  test('empty source object will match with any value', () => {
    const matcher = _matches({})

    expect(matcher({ a: 1, b: 2 })).toBeTruthy()
    expect(matcher([{ a: 1 }])).toBeTruthy()
    expect(matcher(1)).toBeTruthy()
    expect(matcher({})).toBeTruthy()
    expect(matcher(false)).toBeTruthy()
    expect(matcher(undefined)).toBeTruthy()
    expect(matcher(null)).toBeTruthy()
    expect(matcher('qwerty')).toBeTruthy()
  })

  test('empty source array will match with any value', () => {
    const matcher = _matches([])

    expect(matcher({ a: 1, b: 2 })).toBeTruthy()
    expect(matcher([{ a: 1 }])).toBeTruthy()
    expect(matcher(1)).toBeTruthy()
    expect(matcher({})).toBeTruthy()
    expect(matcher(false)).toBeTruthy()
    expect(matcher(undefined)).toBeTruthy()
    expect(matcher(null)).toBeTruthy()
    expect(matcher('qwerty')).toBeTruthy()
  })

  test('treats string as source object value as an array whose elements are characters of that string', () => {
    const matcher = _matches('qwerty')

    expect(matcher('qwerty')).toBeTruthy()
    expect(matcher(['q', 'w', 'e', 'r', 't', 'y'])).toBeTruthy()
  })

  test('when source object is an array then matcher will match values completely', () => {
    const matcher = _matches(['q', 'w', 'e', 'r', 't', 'y'])

    expect(matcher(['q', 'w', 'e', 'r', 't', 'y'])).toBeTruthy()
    expect(matcher(['q', 'w', 'e', 'r', 't'])).toBeFalsy()
  })

  test('returns true always when source object is actually a primitive value', () => {
    const matcher = _matches(1)

    expect(matcher('1')).toBeTruthy()
    expect(matcher('2')).toBeTruthy()
    expect(matcher({ a: 1, b: 2 })).toBeTruthy()
    expect(matcher(1)).toBeTruthy()
    expect(matcher({})).toBeTruthy()
    expect(matcher(false)).toBeTruthy()
    expect(matcher(undefined)).toBeTruthy()
    expect(matcher(null)).toBeTruthy()
    expect(matcher('qwerty')).toBeTruthy()
  })

  test('returns true always when source object is actually a primitive value object', () => {
    const matcher = _matches(new Number(1))

    expect(matcher('1')).toBeTruthy()
    expect(matcher('2')).toBeTruthy()
    expect(matcher({ a: 1, b: 2 })).toBeTruthy()
    expect(matcher(1)).toBeTruthy()
    expect(matcher({})).toBeTruthy()
    expect(matcher(false)).toBeTruthy()
    expect(matcher(undefined)).toBeTruthy()
    expect(matcher(null)).toBeTruthy()
    expect(matcher('qwerty')).toBeTruthy()
  })
})