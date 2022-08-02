
import _map from '../utils/map'
import _isFunction from '../utils/isFunction'

const getArrayCollection = () => [1, 2, 3, 4]

// TODO: use it in other places as well
const getSetCollection = () => {
  const set = new Set()
  set.add(1)
  set.add(2)
  return set
}

const getMapCollection = () => {
  const map = new Map()
  map.set('a', 1)
  map.set('b', 2)
  return map
}

describe('_map()', () => {
  test('accepts two arguments (collection, elementIterator)', () => {
    const elementIterator = jest.fn()
    const collection = getArrayCollection()
    _map(collection, elementIterator)
  })

  test('returns a new array of returned values from second argument', () => {
    const elementIterator = () => 1

    expect(_map([1, 2, 3, 4], elementIterator)).toStrictEqual([1, 1, 1, 1])
  })

  test('calls elementIterator for each element in array and calls elementIterator with three arguments (element, index, array)', () => {
    const collection = [1, 2, 3, 4]
    const elementIterator = jest.fn(() => 1)
    _map(collection, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(4)
    expect(elementIterator.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('calls elementIterator for each key-value pair in object and calls elementIterator with three arguments (value, key, object)', () => {
    const collection = { a: 1, b: 2 }
    const elementIterator = jest.fn(() => 1)
    _map(collection, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(2)
    expect(elementIterator.mock.calls[0]).toEqual([1, 'a', collection])
  })

  test('takes a map and returns an array of values returned by elementIterator', () => {
    const collection = { a: 1, b: 2 }
    const elementIterator = (value, key) => key

    expect(_map(collection, elementIterator)).toStrictEqual(['a', 'b'])
  })
})

describe('Set | Map as collection', () => {
  test.each([getSetCollection(), getMapCollection()])('doesnt run elementIterator for set or map collections', (collection) => {
    const elementIterator = jest.fn(() => true)
    _map(collection, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(0)
  })
})

describe('collection is bad input', () => {
  test('treats string collection as an array and calls elementIterator for each character', () => {
    const elementIterator = (value) => value
    const collection = 'qwerty'

    expect(_map(collection, elementIterator)).toStrictEqual(['q', 'w', 'e', 'r', 't', 'y'])
  })

  test.each([null, undefined, 1, true, NaN])('returns empty array and doesnt call elementIterator when some bad primitive value is used for collection', (collection) => {
    const elementIterator = jest.fn((value) => value)

    expect(_map(collection, elementIterator)).toStrictEqual([])
    expect(elementIterator.mock.calls.length).toBe(0)
  })
})

describe('when elementIterator value is missing or bad', () => {
  test('when elementIterator is not passed and array is collection then _identity is used as default elementIterator and returned array is made of same values but a new one', () => {
    const collection = [1, 2, 3]
    expect(_map(collection)).toStrictEqual(collection)
    expect(_map(collection)).not.toBe(collection)
  })

  test('when elementIterator is not passed then _identity is used as default elementIterator and returned array is made of all values in the object', () => {
    expect(_map({ a: 1, b: 2 })).toStrictEqual([1, 2])
  })

  test('returns an array of true for each element when elementIterator is an object', () => {
    const elementIterator = {}
    expect(_map([1, 2, 3], elementIterator)).toStrictEqual([true, true, true])
  })

  test('returns an array of false for each element when elementIterator is an array', () => {
    const elementIterator = []
    expect(_map([1, 2, 3], elementIterator)).toStrictEqual([false, false, false])
  })

  test.each([null, undefined])('when elementIterator is null or undefined then _identity is used as default elementIterator and returns an array of values with which elementIterator gets called', (elementIterator) => {
    expect(_map([1, 2, 3], elementIterator)).toStrictEqual([1, 2, 3])
  })

  test.each([1, 'qwerty', NaN, true, false])('returns an array with undefined value for each element when elementIterator is primitive value', (elementIterator) => {
    expect(_map([1, 2, 3], elementIterator)).toStrictEqual([undefined, undefined, undefined])
  })
})

describe('when collection and elementIterator both values are bad', () => {
  test('returns result like if only collection was bad', () => {
    const collection = getSetCollection()
    const elementIterator = []
    expect(_map(collection, elementIterator)).toStrictEqual([])
  })
})
