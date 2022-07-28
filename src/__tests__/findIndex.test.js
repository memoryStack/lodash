import _findIndex from '../utils/findIndex'

describe('_findIndex(array | object, predicate, startIndex)', () => {
  test('returns index of first element in array for which predicate returns true', () => {
    const predicate = (element) => element % 2 === 0

    expect(_findIndex([1, 2, 3, 4], predicate)).toBe(1)
  })

  test('call predicate with 3 arguments when collection is array (element, index, collection)', () => {
    const predicate = jest.fn()
    const collection = [1, 2, 3, 4]
    _findIndex(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(predicate.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('by default starts searching from first index but we can pass startIndex argument to control it', () => {
    const predicate = (element) => element % 2 === 0

    expect(_findIndex([1, 2, 3, 4], predicate, 2)).toBe(3)
  })

  test('returns -1 if predicate returns false for every element', () => {
    const predicate = (element) => element > Number.POSITIVE_INFINITY

    expect(_findIndex([1, 2, 3, 4], predicate)).toBe(-1)
  })

  test('doesnt call predicate at all when collection is object and returns -1', () => {
    const collection = { a: 1, b: { c: 2 } }
    const predicate = jest.fn()

    expect(_findIndex(collection, predicate)).toBe(-1)
    expect(predicate.mock.calls.length).toBe(0)
  })

  test('when passed collection is a Set then doesnt run predicate at all and returns -1', () => {
    const collection = new Set()
    collection.add(1)
    collection.add({ a: 1 })
    const predicate = jest.fn(() => true)

    expect(_findIndex(collection, predicate)).toBe(-1)
    expect(predicate.mock.calls.length).toBe(0)
  })

  test('when passed collection is a Map then doesnt run predicate at all and returns -1', () => {
    const collection = new Map()
    collection.set('a', 1)
    collection.set('b', 2)
    const predicate = jest.fn(() => true)

    expect(_findIndex(collection, predicate)).toBe(-1)
    expect(predicate.mock.calls.length).toBe(0)
  })

  test.each(['a', 1, { a: 1 }, []])('works like predicate returned true if predicate returns truthy value', (predicateReturnValue) => {
    expect(_findIndex([1, 2, 3], () => predicateReturnValue)).toBe(0)
  })

  test.each([null, undefined, '', 0, NaN])('works like predicate returned false if predicate returns falsy value', (predicateReturnValue) => {
    expect(_findIndex([1, 2, 3], () => predicateReturnValue)).toBe(-1)
  })
})

describe('when predicate value is missing or bad', () => {
  test('when predicate is not passed then _identity is used as default predicate and returns first truthy value index', () => {
    expect(_findIndex([1, 2, 3, 0, false, null, NaN, {}])).toBe(0)
  })

  test.each([null, undefined, {}])('returns first truthy element index from collection when predicate is null or undefined or empty object', (predicate) => {
    expect(_findIndex([1, 2, 3], predicate)).toBe(0)
  })

  test.each([1, 'qwerty', [], NaN, true])('returns -1 if predicate is primitive value or an array', (predicate) => {
    expect(_findIndex([1, 2, 3], predicate)).toBe(-1)
  })
})

describe('when collection value is bad', () => {
  test('treats a string primitive or object value as an array with string characters as its elements and returns index of first element for which predicate returned true', () => {
    expect(_findIndex('qwerty', () => true)).toBe(0)
    expect(_findIndex(new String('qwerty'), () => true)).toBe(0)
  })

  test.each([null, undefined, 1, true, NaN])('returns -1 when some primitive value is used for collection', (collection) => {
    expect(_findIndex(collection, () => true)).toBe(-1)
  })
})
