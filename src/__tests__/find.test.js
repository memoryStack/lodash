import _find from '../utils/find'

describe('_find(array | object, predicate, startIndex)', () => {
  test('returns first element in array for which predicate returns true', () => {
    const predicate = (element) => element % 2 === 0

    expect(_find([1, 2, 3, 4], predicate)).toBe(2)
  })

  test('call predicate with 3 arguments when collection is array (element, index, collection)', () => {
    const predicate = jest.fn()
    const collection = [1, 2, 3, 4]
    _find(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(predicate.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('by default starts searching from first element but we can pass startIndex argument to control it', () => {
    const predicate = (element) => element % 2 === 0

    expect(_find([1, 2, 3, 4], predicate, 2)).toBe(4)
  })

  test('returns undefined if predicate returns false for every element', () => {
    const predicate = (element) => element > Number.POSITIVE_INFINITY

    expect(_find([1, 2, 3, 4], predicate)).toBeUndefined()
  })

  test('returns value of a key in object for which predicate returned true', () => {
    const collection = { a: 1, b: { c: 2 } }
    const predicate = (element) => typeof element === 'object'

    expect(_find(collection, predicate)).toStrictEqual({ c: 2 })
  })

  test('call predicate with 3 arguments when collection is object (value, key, collection)', () => {
    const predicate = jest.fn()
    const collection = { a: 1, b: { c: 2 } }
    _find(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    // TODO: research why toStrictEqual doesn't work here
    expect(predicate.mock.calls[0]).toEqual([1, 'a', collection])
  })

  test('when passed collection is a Set then doesnt run predicate at all and returns undefined', () => {
    const collection = new Set()
    collection.add(1)
    collection.add({ a: 1 })
    const predicate = jest.fn(() => true)

    expect(_find(collection, predicate)).toBeUndefined()
    expect(predicate.mock.calls.length).toBe(0)
  })

  test('when passed collection is a Map then doesnt run predicate at all and returns undefined', () => {
    const collection = new Map()
    collection.set('a', 1)
    collection.set('b', 2)
    const predicate = jest.fn(() => true)

    expect(_find(collection, predicate)).toBeUndefined()
    expect(predicate.mock.calls.length).toBe(0)
  })

  test.each(['a', 1, { a: 1 }, []])('works like predicate returned true if predicate returns truthy value', (predicateReturnValue) => {
    expect(_find([1, 2, 3], () => predicateReturnValue)).toBe(1)
  })

  test.each([null, undefined, '', 0, NaN])('works like predicate returned false if predicate returns falsy value', (predicateReturnValue) => {
    expect(_find([1, 2, 3], () => predicateReturnValue)).toBeUndefined()
  })
})

describe('when predicate value is missing or bad', () => {
  test('when predicate is not passed then _identity is used as default predicate and returns first truthy value', () => {
    expect(_find([1, 2, 3, 0, false, null, NaN, {}])).toBe(1)
  })

  test.each([null, undefined, {}])('returns first truthy element from collection when predicate is null or undefined or empty object', (predicate) => {
    expect(_find([1, 2, 3], predicate)).toBe(1)
  })

  test.each([1, 'qwerty', [], NaN, true])('returns undefined if predicate is primitive value or an array', (predicate) => {
    expect(_find([1, 2, 3], predicate)).toBeUndefined()
  })
})

describe('when collection value is bad', () => {
  test('treats a string primitive or object value as an array with string characters as its elements', () => {
    expect(_find('qwerty', () => true)).toBe('q')
    expect(_find(new String('qwerty'), () => true)).toBe('q')
  })

  test.each([null, undefined, 1, true, NaN])('returns undefined when some primitive value is used for collection', (collection) => {
    expect(_find(collection, () => true)).toBeUndefined()
  })
})
