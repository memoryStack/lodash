import _some from '../utils/some'

describe('_some(array | object, predicate)', () => {
  test('returns true when for any element the predicate returns true', () => {
    const predicate = (element) => element % 2 === 0

    expect(_some([1, 2, 3, 4], predicate)).toBe(true)
  })

  test('call predicate with 3 arguments when collection is array (element, index, collection)', () => {
    const predicate = jest.fn()
    const collection = [1, 2, 3, 4]
    _some(collection, predicate)

    expect(predicate.mock.calls[0].length).toBe(3)
    expect(predicate.mock.calls[0]).toEqual([1, 0, collection])
  })

  test('returns false if predicate returns false for every element', () => {
    const predicate = (element) => element > Number.POSITIVE_INFINITY

    expect(_some([1, 2, 3, 4], predicate)).toBe(false)
  })

  test('treats an object as an array with keys as index and values as the array items', () => {
    const collection = { a: 1, b: { c: 2 } }
    const predicate = jest.fn()
    expect(_some(collection, predicate)).toBe(false)
    expect(predicate.mock.calls.length).toBe(2)
  })

  test('when passed collection is a Set then doesnt run predicate at all and returns false', () => {
    const collection = new Set()
    collection.add(1)
    collection.add({ a: 1 })
    const predicate = jest.fn(() => true)

    expect(_some(collection, predicate)).toBe(false)
    expect(predicate.mock.calls.length).toBe(0)
  })

  test('when passed collection is a Map then doesnt run predicate at all and returns false', () => {
    const collection = new Map()
    collection.set('a', 1)
    collection.set('b', 2)
    const predicate = jest.fn(() => true)

    expect(_some(collection, predicate)).toBe(false)
    expect(predicate.mock.calls.length).toBe(0)
  })

  test.each(['a', 1, { a: 1 }, []])('works like predicate returned true if predicate returns truthy value', (predicateReturnValue) => {
    expect(_some([1, 2, 3], () => predicateReturnValue)).toBe(true)
  })

  test.each([null, undefined, '', 0, NaN])('works like predicate returned false if predicate returns falsy value', (predicateReturnValue) => {
    expect(_some([1, 2, 3], () => predicateReturnValue)).toBe(false)
  })
})

describe('predicate shorthands when predicate is not a function', () => {
  test('predicate used is _matches(obj) when passed value is an object', () => {
    const collection = [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ]
    expect(_some(collection, { a: 2 })).toBe(true)
  })

  test('predicate used is _matchesProperty() when passed predicate is an array', () => {
    const collection = [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ]
    expect(_some(collection, ['a', 2])).toBe(true)

    const collection2 = [
      { a: { c: 1 }, b: 1 },
      { a: 2, b: 2 },
    ]
    expect(_some(collection2, ['a.c', 1])).toBe(true)
  })

  test('predicate used is _property() when passed predicate is a string and will return the value at the path mentioned by the string', () => {
    const collection = [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ]
    expect(_some(collection, 'b')).toBe(true)

    const collection2 = [
      { a: 1, b: 1 },
      { a: { c: 1 }, b: 2 },
    ]
    expect(_some(collection2, 'a.c')).toBe(true)
  })
})

describe('when predicate value is missing or bad', () => {
  test('when predicate is not passed then _identity is used as default predicate and returns true for first truthy value', () => {
    expect(_some([1, 2, 3, 0, false, null, NaN, {}])).toBe(true)
  })

  test.each([null, undefined, {}])('returns true always when predicate is null or undefined or empty object', (predicate) => {
    expect(_some([undefined, null, 1, 2, 3], predicate)).toBe(true)
  })

  test.each([1, 'qwerty', [], NaN, true])('returns false if predicate is primitive value or an array or NaN', (predicate) => {
    expect(_some([1, 2, 3], predicate)).toBe(false)
  })
})

describe('when collection value is bad', () => {
  test('treats a string primitive or object value as an array with string characters as its elements and returns index of first element for which predicate returned true', () => {
    expect(_some('qwerty', (char) => char)).toBe(true)
    expect(_some(new String('qwerty'), () => true)).toBe(true)
  })

  test.each([null, undefined, 1, true, NaN, ''])('returns -1 when some primitive values or empty string are used for collection', (collection) => {
    expect(_some(collection, () => true)).toBe(false)
  })
})
