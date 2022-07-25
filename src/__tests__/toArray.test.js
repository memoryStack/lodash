import _toArray from '../utils/toArray'

describe('_toArray()', () => {
  test('splits passed string characters and returns an array with these characters as elements', () => {
    expect(_toArray('qwerty')).toStrictEqual(['q', 'w', 'e', 'r', 't', 'y'])
    expect(_toArray('')).toStrictEqual([])
  })

  test('takes object key values and returns then in an array in some sorted order', () => {
    const value = {
      '2': 'two',
      b: 2,
      c: { d: 3 },
      A: 0,
      a: 1,
      '1': 'one'
    }

    expect(_toArray(value)).toStrictEqual(['one', 'two', 2, { d: 3 }, 0, 1])
  })

  test.skip('sorts values based on rules ... ?', () => {
    const value = {
      '2': 'two',
      b: 2,
      c: { d: 3 },
      A: 0,
      a: 1,
      '1': 'one'
    }

    expect(_toArray(value)).toStrictEqual(['one', 'two', 2, { d: 3 }, 0, 1])
  })

  test('returns a new array with same values when array is passed', () => {
    const arr = [1, 2]
    expect(_toArray(arr)).toStrictEqual(arr)
    expect(_toArray(arr)).not.toBe(arr)
  })

  test('returns an array of key values pairs array when map is passed', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    map.set('1', 3)

    expect(_toArray(map)).toStrictEqual([
      ['a', 1],
      ['b', 2],
      ['1', 3],
    ])
  })

  test('returns an array of values which are in Set container', () => {
    const set = new Set()
    set.add(1)
    set.add({ a: 1 })

    expect(_toArray(set)).toStrictEqual([1, { a: 1 }])
  })

  test('returns empty array when null or undefined or some value is passed which doesnt have enumerable properties', () => {
    expect(_toArray(null)).toStrictEqual([])
    expect(_toArray(undefined)).toStrictEqual([])
    expect(_toArray(false)).toStrictEqual([])
    expect(_toArray(1)).toStrictEqual([])
  })
})
