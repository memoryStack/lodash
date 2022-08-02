import _forEach from '../utils/forEach'
import { getArrayCollection, getMapCollection, getSetCollection } from '../learningTestsUtils'

describe('_forEach()', () => {
  test('accepts two arguments (collection, elementIterator)', () => {
    const elementIterator = jest.fn()
    const collection = getArrayCollection()
    _forEach(collection, elementIterator)
  })

  test('returns passed collection as it is', () => {
    const returnedValue = _forEach(getArrayCollection(), jest.fn())

    expect(returnedValue).toStrictEqual(getArrayCollection())
  })

  test('calls elementIterator with 3 arguments when collection is array (element, index, collection)', () => {
    const elementIterator = jest.fn()
    const collection = getArrayCollection()
    _forEach(collection, elementIterator)

    expect(elementIterator.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(elementIterator.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('call elementIterator with 3 arguments when collection is object (value, key, collection)', () => {
    const elementIterator = jest.fn()
    const collection = { a: 1, b: 2 }
    _forEach(collection, elementIterator)

    expect(elementIterator.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(elementIterator.mock.calls[0]).toEqual([1, 'a', collection])
  })

  test('calls elementIterator for each element in collection', () => {
    const elementIterator = jest.fn()
    const collection = getArrayCollection()
    _forEach(collection, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(collection.length)
  })

  test('doesnt runs for rest of elements once elementIterator returns false', () => {
    const elementIterator = jest.fn((element) => element !== 2)
    const collection = [1, 2, 3, 4]
    _forEach(collection, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(2)
  })

  test('doesnt consider returning falsy value as a sign of early return', () => {
    const elementIterator = jest.fn(() => null)
    const collection = [1, 2, 3, 4]
    _forEach(collection, elementIterator)

    expect(elementIterator.mock.calls.length).not.toBe(1)
  })

  test('calls for each key of object', () => {
    // TODO: dig out in which order these key-value pairs are iterated
    const elementIterator = jest.fn((value) => { /* do something with value */ })
    _forEach({ a: 1, b: 2 }, elementIterator)

    expect(elementIterator.mock.calls.length).toBe(2)
  })
})

describe('Set | Map as collection', () => {
  test.each([getSetCollection(), getMapCollection()])('doesnt run elementIterator for set or map collections', (collection) => {
    const elementIterator = jest.fn(() => true)

    expect(elementIterator.mock.calls.length).toBe(0)
  })
})

describe('collection is bad input', () => {
  test('treats string collection as an array and calls elementIterator for each character', () => {
    const elementIterator = jest.fn(() => true)
    const collection = 'qwerty'

    expect(_forEach(collection, elementIterator)).toBe(collection)
    expect(elementIterator.mock.calls.length).toBe(collection.length)
  })

  test.each([null, undefined, 1, true, NaN])('returns collection without crashing and doesnt call elementIterator when some bad primitive value is used for collection', (collection) => {
    const elementIterator = jest.fn(() => { })

    expect(_forEach(collection, elementIterator)).toBe(collection)
    expect(elementIterator.mock.calls.length).toBe(0)
  })
})

describe('when elementIterator value is missing or bad', () => {
  test('when elementIterator is not passed then returns passed collection as it is without crashing', () => {
    expect(_forEach([1, 2, 3])).toStrictEqual([1, 2, 3])
  })

  test.each([null, undefined, 1, 'qwerty', [], NaN, true, false, {}])('when elementIterator is not a function then returns passed collection as it is without crashing', (elementIterator) => {
    expect(_forEach([1, 2, 3], elementIterator)).toStrictEqual([1, 2, 3])
  })
})
