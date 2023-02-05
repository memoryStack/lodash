import _reduce from '../utils/reduce'

/*
  1. accepts only array and object
      what will happen for map or set or primitives ??
  2. what if predicate is bad
*/
describe('_reduce(array | object, iteratee, accumulator)', () => {
  test('accepts 3 arguments (collection, iteratee, accumulator) and returns a single reduced value', () => {
    const collection = [1, 2, 3, 4]
    _reduce(collection, () => { }, {})
  })

  test('calls iteratee with 4 arguments when collection is array (accumulator, value, index, collection)', () => {
    const iteratee = jest.fn()
    _reduce([1, 2, 3, 4], iteratee)
    expect(iteratee.mock.calls[0].length).toBe(4)
    expect(typeof iteratee.mock.calls[0][2] === 'number').toBe(true)
  })

  test('calls iteratee with 4 arguments when collection is object (accumulator, value, key, collection)', () => {
    const iteratee = jest.fn()
    _reduce({ a: 1, b: 2 }, iteratee)
    expect(iteratee.mock.calls[0].length).toBe(4)
    expect(typeof iteratee.mock.calls[0][2] === 'string').toBe(true)
  })
})

describe('use of iteratee', () => {
  test('example of adding all numbers in an array with initial accumulator', () => {
    const iteratee = jest.fn((acc, value) => acc + value)
    expect(_reduce([1, 2, 3, 4], iteratee, 0)).toBe(10)
    expect(iteratee.mock.calls.length).toBe(4)
  })

  test('uses first value as initial accumulator when no accumulator is passed', () => {
    const iteratee = jest.fn((acc, value) => acc + value)
    expect(_reduce([1, 2, 3, 4], iteratee)).toBe(10)
    expect(iteratee.mock.calls.length).toBe(3)
  })

  test('example of iteratee when collection is an object', () => {
    const iteratee = function (result, value, key) {
      (result[value] || (result[value] = [])).push(key);
      return result;
    }
    const expectedResult = {
      '1': ['a', 'c'],
      '2': ['b']
    }
    expect(_reduce({ 'a': 1, 'b': 2, 'c': 1 }, iteratee, {})).toEqual(expectedResult)
  })
})

describe('collections like Map and Set', () => {
  test('doesnt call iteratee at all for Set collection and returns initial accumulator if passed', () => {
    const collection = new Set()
    collection.add(1)
    collection.add(2)
    const iteratee = jest.fn()
    expect(_reduce(collection, iteratee, {})).toEqual({})
    expect(_reduce(collection, iteratee)).toBeUndefined()
    expect(iteratee.mock.calls.length).toBe(0)
  })

  test('doesnt call iteratee at all for Map collection and returns initial accumulator if passed', () => {
    const collection = new Map()
    collection.set('a', 1)
    collection.set('b', 2)
    const iteratee = jest.fn()
    expect(_reduce(collection, iteratee, {})).toEqual({})
    expect(_reduce(collection, iteratee)).toBeUndefined()
    expect(iteratee.mock.calls.length).toBe(0)
  })
})

describe('collections is a string', () => {
  test('treats passed string as an array', () => {
    const iteratee = jest.fn((acc, char) => {
      acc[char] = char
      return acc
    })
    const expectedResult = {
      'q': 'q',
      'w': 'w',
      'e': 'e',
      'r': 'r',
      't': 't',
      'y': 'y',
    }
    expect(_reduce('qwerty', iteratee, {})).toEqual(expectedResult)
  })
})

describe('collections is empty', () => {
  test('doesnt call iteratee and returns initial accumulator', () => {
    const iteratee = jest.fn()
    expect(_reduce('', iteratee)).toBeUndefined()
    expect(_reduce([], iteratee)).toBeUndefined()
    expect(_reduce({}, iteratee)).toBeUndefined()
    expect(_reduce('', iteratee, {})).toEqual({})
    expect(_reduce([], iteratee, {})).toEqual({})
    expect(_reduce({}, iteratee, {})).toEqual({})
    expect(iteratee.mock.calls.length).toBe(0)
  })
})

describe('collections is primitive or nil value', () => {
  const collections = [1, 0, null, undefined, NaN]
  test.each(collections)('doesnt call iteratee and returns initial accumulator', (collection) => {
    const iteratee = jest.fn()
    expect(_reduce(collection, iteratee)).toBeUndefined()
    expect(_reduce(collection, iteratee, {})).toEqual({})
    expect(iteratee.mock.calls.length).toBe(0)
  })
})

describe('iteratee is not a function', () => {
  test.each([null, undefined])('considers iteratee as identity function if passed iteratee is null or undefined', (iteratee) => {
    const collection = [1, 2]
    expect(_reduce(collection, iteratee)).toBe(1)
  })

  test.each([1, '', 0, NaN,])('always returns undefined if iteratee is one or these', (iteratee) => {
    const collection = [1, 2]
    expect(_reduce(collection, iteratee)).toBeUndefined()
    expect(_reduce(collection, iteratee, {})).toBeUndefined()
  })

  // TODO: how to make sense of it
  test.skip.each([{}, { b: 1 }])('always returns undefined if iteratee is one or these', (iteratee) => {
    // const collection = [1, 2] // returns true and false
    // const collection = { a: 1 } // returns 1
    // const collection = { a: 1, c: 2 } // returns true, false for given iteratees
    // const collection = {} // returns same value as passed, basically empty collection works here
    expect(_reduce(collection, iteratee)).toBeUndefined()
    // expect(_reduce(collection, iteratee, {})).toBeUndefined()
  })

})