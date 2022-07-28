import _filter from '../utils/filter'

describe('_filter(array | object, predicate)', () => {

  test('returns elements in an array for which predicate returned true', () => {
    const arr = [1, 2, 3]
    const predicate = (element) => element % 2

    expect(_filter(arr, predicate)).toStrictEqual([1, 3])
  })

  test('returns a new array always', () => {
    const arr = [1, 2, 3]
    const predicate = () => true

    expect(_filter(arr, predicate)).not.toBe(arr)
  })

  test('returns empty array if for all elements predicate returned false', () => {
    const arr = [1, 2, 3]
    const predicate = () => false

    expect(_filter(arr, predicate)).toStrictEqual([])
  })

  test('when object is passed then returns an array of filtered object.values for which predicate returned true', () => {
    const object = { a: 1, b: 3 }
    const predicate = () => true

    expect(_filter(object, predicate)).toStrictEqual([1, 3])
  })

  test('when object is passed then returns an empty array if predicate returned false for all keys', () => {
    const object = { a: 1, b: 3 }
    const predicate = () => false

    expect(_filter(object, predicate)).toStrictEqual([])
  })

  test('when passed collection is a Set then doesnt run predicate at all and retrurns empty array', () => {
    const set = new Set()
    set.add(1)
    set.add({ a: 1 })
    const predicate = jest.fn(() => true)

    expect(_filter(set, predicate)).toStrictEqual([])
    expect(predicate.mock.calls.length).toBe(0)
  })

  test('when passed collection is a Map then doesnt run predicate at all and retrurns empty array', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    const predicate = jest.fn(() => true)

    expect(_filter(map, predicate)).toStrictEqual([])
    expect(predicate.mock.calls.length).toBe(0)
  })

  test.each(['a', 1, { a: 1 }, []])('works like predicate returned true if predicate returns truthy value', (predicateReturnValue) => {
    const arr = [1, 2, 3]
    const predicate = () => predicateReturnValue

    expect(_filter(arr, predicate)).toStrictEqual(arr)
  })

  test.each([null, undefined, '', 0, NaN])('works like predicate returned false if predicate returns falsy value', (predicateReturnValue) => {
    const arr = [1, 2, 3]
    const predicate = () => predicateReturnValue

    expect(_filter(arr, predicate)).toStrictEqual([])
  })

})

describe('when predicate value is bad', () => {
  test('when predicate is not passed then _identity is used a default predicate and returns truthy values and filter out falsy values', () => {
    expect(_filter([1, 2, 3, 0, false, null, NaN, {}])).toStrictEqual([1, 2, 3, {}])
  })

  test.each([null, undefined, {}])('returns collection elements as they are if predicate is null or undefined or empty object', (predicate) => {
    const arr = [1, 2, 3]

    expect(_filter(arr, predicate)).toStrictEqual(arr)
  })

  test.each([1, 'qwerty', [], NaN, true])('returns collection elements as they are if predicate is primitive value or an array', (predicate) => {
    expect(_filter([1, 2, 3], predicate)).toStrictEqual([])
  })
})

describe('when collection value is bad', () => {
  test('treats a string primitive or object value as an array with string characters as its elements', () => {
    const predicate = () => true

    expect(_filter('qwerty', predicate)).toStrictEqual(['q', 'w', 'e', 'r', 't', 'y'])
    expect(_filter(new String('qwerty'), predicate)).toStrictEqual(['q', 'w', 'e', 'r', 't', 'y'])
  })

  test.each([null, undefined, 1, true, NaN])('returns empty array when some primitive value is used for collection', (collection) => {
    const predicate = () => true

    expect(_filter(collection, predicate)).toStrictEqual([])
  })


})
