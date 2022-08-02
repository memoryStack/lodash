import _every from '../utils/every'
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

describe('arguments', () => {

  test('accepts two arguments (collection and predicate)', () => {
    const predicate = jest.fn()
    const collection = getArrayCollection()
    _every(collection, predicate)
  })

  test('calls predicate with 3 arguments when collection is array (element, index, collection)', () => {
    const predicate = jest.fn()
    const collection = getArrayCollection()
    _every(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(predicate.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('call predicate with 3 arguments when collection is object (value, key, collection)', () => {
    const predicate = jest.fn()
    const collection = { a: 1, b: 2 }
    _every(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(predicate.mock.calls[0]).toEqual([1, 'a', collection])
  })
})

describe('_every() functionality', () => {
  test('returns true when predicate returns true for all elements', () => {
    const predicate = (element) => element > 0

    expect(_every([1, 2, 3, 4], predicate)).toBeTruthy()
  })

  test('returns false when predicate returns false for any element', () => {
    const predicate = (element) => element !== 3

    expect(_every([1, 2, 3, 4], predicate)).toBeFalsy()
  })

  test('when collection is object returns true when predicate returns true for all calls', () => {
    const collection = { a: 'a', b: 'b' }
    const predicate = (value) => typeof value === 'string'

    expect(_every(collection, predicate)).toBeTruthy()
  })

  test('doesnt call predicate for rest of elements once it returns false', () => {
    const predicate = jest.fn((element) => element !== 3)
    _every([1, 2, 3, 4], predicate)

    expect(predicate.mock.calls.length).toBe(3)
  })
})

describe('Set | Map as collection', () => {
  test.each([getSetCollection(), getMapCollection()])('doesnt run predicate for set or map collections', (collection) => {
    const predicate = jest.fn(() => true)

    _every(collection, predicate)
    expect(predicate.mock.calls.length).toBe(0)
  })
})

describe('collection is bad input', () => {
  test('treats string collection as an array and calls predicate for each character', () => {
    const predicate = jest.fn(() => true)
    const collection = 'qwerty'
    const returnedValue = _every(collection, predicate)
    expect(predicate.mock.calls.length).toBe(collection.length)
    expect(returnedValue).toBeTruthy()
  })

  test.each([null, undefined, 1, true, NaN])('returns true and doesnt call predicate when some bad primitive value is used for collection', (collection) => {
    const predicate = jest.fn(() => false)

    const returnedValue = _every(collection, predicate)
    expect(predicate.mock.calls.length).toBe(0)
    expect(returnedValue).toBeTruthy()
  })
})

describe('when predicate value is missing or bad', () => {
  test('when predicate is not passed then _identity is used as default predicate and returns true/false based on elements truthiness', () => {
    expect(_every([1, 2, 3, 0, false, null, NaN, {}])).toBeFalsy()
    expect(_every([1, 2, 3])).toBeTruthy()
  })

  test('returns true always when predicate is an object', () => {
    const predicate = {}
    expect(_every([1, 2, 3, 0, null], predicate)).toBeTruthy()
  })

  test.each([null, undefined])('when predicate is null or undefined then _identity is used as default predicate and returns true/false based on elements truthiness', (predicate) => {
    expect(_every([1, 2, 3], predicate)).toBeTruthy()
    expect(_every([1, 2, 3, 0], predicate)).toBeFalsy()
  })

  test.each([1, 'qwerty', [], NaN, true, false])('returns false if predicate is primitive value or an array', (predicate) => {
    expect(_every([1, 2, 3], predicate)).toBeFalsy()
  })
})
