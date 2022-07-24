import _property from '../utils/property'
import _isFunction from '../utils/isFunction'

describe('_property()', () => {
  test('returns a function value', () => {
    const returnedValue = _property('a')
    expect(_isFunction(returnedValue)).toBeTruthy()
  })

  test('returned function will get the value stored in passed object at the given path', () => {
    const obj = {
      a: {
        b: {
          c: [
            {
              d: 'qwerty'
            }
          ]
        }
      }
    }

    const valueGetter = _property('a.b.c[0].d')
    expect(valueGetter(obj)).toBe('qwerty')
  })

  test('path can be given in multiple forms like in array or string', () => {
    const obj = {
      a: {
        b: {
          c: [
            {
              d: 'qwerty'
            }
          ]
        }
      }
    }

    const valueGetterOne = _property('a.b.c[0].d')
    const valueGetterTwo = _property('a.b.c.0.d')
    const valueGetterThree = _property(['a', 'b', 'c', '0', 'd'])

    expect(valueGetterOne(obj)).toBe('qwerty')
    expect(valueGetterTwo(obj)).toBe('qwerty')
    expect(valueGetterThree(obj)).toBe('qwerty')
  })

  test('returns undefined without crashing when given path doesnt exist in object', () => {
    const obj = { a: 'a' }

    expect(_property('')(obj)).toBeUndefined()
    expect(_property('a.b.c')(obj)).toBeUndefined()
  })

  test('accepts integer value as key and returns value at that key in object', () => {
    const obj = { a: 'a', '123': 123 }
    expect(_property(123)(obj)).toBe(123)
    expect(_property(1)(obj)).toBeUndefined()
  })

  test('accepts non string format values as keys and returns value at those keys in object', () => {
    const obj = {
      a: 'a',
      '123': 123,
      undefined: 'value is undefined',
      null: 'value is null',
      NaN: "value is NaN",
    }

    expect(_property(123)(obj)).toBe(123)
    expect(_property(undefined)(obj)).toBe('value is undefined')
    expect(_property(null)(obj)).toBe('value is null')
    expect(_property(NaN)(obj)).toBe('value is NaN')
  })
})
