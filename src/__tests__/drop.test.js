import _drop from '../utils/drop'

describe('_drop(array, n)', () => {

  test('removes n elements from start and returns a new array', () => {
    expect(_drop([1, 2, 3], 2)).toStrictEqual([3])
  })

  test('returns a new array', () => {
    const array = [1, 2, 3]
    expect(_drop(array, 0)).not.toBe(array)
  })

  test('removed 1 element from start by default', () => {
    expect(_drop([1, 2, 3])).toStrictEqual([2, 3])
  })

  test('returns empty array when number of elements to remove exceeds length of array', () => {
    expect(_drop([1, 2, 3], 4)).toStrictEqual([])
  })

  test('number of elements to remove argument is acceptable in string format as well', () => {
    expect(_drop([1, 2, 3], '')).toStrictEqual([1, 2, 3])
    expect(_drop([1, 2, 3], '1')).toStrictEqual([2, 3])
    expect(_drop([1, 2, 3], '2')).toStrictEqual([3])
  })

  test('returns array as it is when n is null or false or NaN or some non number transformable value like object or alphabetical string', () => {
    expect(_drop([1, 2, 3], null)).toStrictEqual([1, 2, 3])
    expect(_drop([1, 2, 3], false)).toStrictEqual([1, 2, 3])
    expect(_drop([1, 2, 3], NaN)).toStrictEqual([1, 2, 3])
    expect(_drop([1, 2, 3], {})).toStrictEqual([1, 2, 3])
    expect(_drop([1, 2, 3], 'qwerty')).toStrictEqual([1, 2, 3])
  })

  test('removes first element when n is passed as undefined or true', () => {
    expect(_drop([1, 2, 3], undefined)).toStrictEqual([2, 3])
    expect(_drop([1, 2, 3], true)).toStrictEqual([2, 3])
  })

  test('returns empty array when first argument is not an array ', () => {
    expect(_drop(null, 2)).toStrictEqual([])
    expect(_drop(undefined, 2)).toStrictEqual([])
    expect(_drop({}, 2)).toStrictEqual([])
    expect(_drop('', 0)).toStrictEqual([])
    expect(_drop(123, 2)).toStrictEqual([])
  })

  test('when passed array is string type then it considers that string as an array having characters as its elements', () => {
    expect(_drop('qwerty', 2)).toStrictEqual(['e', 'r', 't', 'y'])
  })
})