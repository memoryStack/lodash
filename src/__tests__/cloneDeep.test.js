import _cloneDeep from '../utils/cloneDeep'
import _isFunction from '../utils/isFunction'

describe('_cloneDeep()', () => {
  test('returns null when passed value is null', () => {
    expect(_cloneDeep(null)).toBeNull()
  })

  test('returns undefined when passed value is undefined', () => {
    expect(_cloneDeep(undefined)).toBeUndefined()
  })

  test('returns same value if passed value is primitive', () => {
    expect(_cloneDeep(1)).toBe(1)
    expect(_cloneDeep('')).toBe('')
    expect(_cloneDeep('1')).toBe('1')
    expect(_cloneDeep(1.2)).toBe(1.2)
    expect(_cloneDeep(true)).toBeTruthy()
    expect(_cloneDeep(false)).toBeFalsy()
  })

  test('returns a cloned value with each of its property values cloned deeply', () => {
    const obj = {
      a: '1',
      b: [1, 2, 3],
      c: null,
      e: new Map(),
      f: {
        h: {
          i: "i am"
        }
      }
    }

    const clonedValue = _cloneDeep(obj)

    expect(clonedValue).toStrictEqual(obj)
    expect(clonedValue === obj).toBeFalsy()
    expect(clonedValue.b === obj.b).toBeFalsy()
    expect(clonedValue.e === obj.e).toBeFalsy()
    expect(clonedValue.f.h === obj.f.h).toBeFalsy()
  })

  test('returns empty object when function is passed', () => {
    const func = () => { }
    expect(_cloneDeep(func)).toStrictEqual({})
  })

  test('doesnt clone function into empty object when function is a value of object key or an element of array', () => {
    const obj = {
      func: () => { }
    }
    expect(_cloneDeep(obj).func === obj.func).toBeTruthy()

    const arr = [() => { }]
    expect(_isFunction(_cloneDeep(arr)[0])).toBeTruthy()
    expect(_cloneDeep(arr)[0] === arr[0]).toBeTruthy()
  })
})