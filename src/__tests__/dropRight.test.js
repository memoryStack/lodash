import _dropRight from '../utils/dropRight'

describe('_dropRight(array, n)', () => {

  test('removes n elements from end and returns a new array', () => {
    expect(_dropRight([1, 2, 3], 2)).toStrictEqual([1])
  })

  test('returns a new array always even when the content is not changed', () => {
    const array = [1, 2, 3]
    expect(_dropRight(array, 0)).not.toBe(array)
  })

  test('removed 1 element from end by default', () => {
    expect(_dropRight([1, 2, 3])).toStrictEqual([1, 2])
  })

  test('returns empty array when number of elements to remove exceeds length of array', () => {
    expect(_dropRight([1, 2, 3], 4)).toStrictEqual([])
  })

  test('number of elements to remove argument is acceptable in string format as well', () => {
    expect(_dropRight([1, 2, 3], '')).toStrictEqual([1, 2, 3])
    expect(_dropRight([1, 2, 3], '1')).toStrictEqual([1, 2])
    expect(_dropRight([1, 2, 3], '2')).toStrictEqual([1])
  })

  test('returns array as it is when n is null or false or NaN or some non number transformable value like object or alphabetical string', () => {
    expect(_dropRight([1, 2, 3], null)).toStrictEqual([1, 2, 3])
    expect(_dropRight([1, 2, 3], false)).toStrictEqual([1, 2, 3])
    expect(_dropRight([1, 2, 3], NaN)).toStrictEqual([1, 2, 3])
    expect(_dropRight([1, 2, 3], {})).toStrictEqual([1, 2, 3])
    expect(_dropRight([1, 2, 3], 'qwerty')).toStrictEqual([1, 2, 3])
  })

  test('removes last element when n is passed as undefined or true', () => {
    expect(_dropRight([1, 2, 3], undefined)).toStrictEqual([1, 2])
    expect(_dropRight([1, 2, 3], true)).toStrictEqual([1, 2])
  })

  test('returns empty array when first argument is not an array ', () => {
    expect(_dropRight(null, 2)).toStrictEqual([])
    expect(_dropRight(undefined, 2)).toStrictEqual([])
    expect(_dropRight({}, 2)).toStrictEqual([])
    expect(_dropRight('', 0)).toStrictEqual([])
    expect(_dropRight(123, 2)).toStrictEqual([])
  })

  test('when passed array is string type then it considers that string as an array having characters as its elements', () => {
    expect(_dropRight('qwerty', 2)).toStrictEqual(['q', 'w', 'e', 'r',])
  })

})