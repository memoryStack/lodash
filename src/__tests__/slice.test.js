import _slice from '../utils/slice'

describe('_slice(array, start, end)', () => {
  // will return a shallow copy of array, without modifying original array
  // start and end are the indexes of elements which will be included in sliced array
  // "end" index will not be included in the list

  test('will return array from start index to end-1 index without modifying the original array', () => {
    const array = [1, 2, 4]

    expect(_slice(array, 0, 2)).toEqual([1, 2])
    expect(array).toEqual(array)
  })

  test('returns full array if end is greater than the last element index', () => {
    const array = [1, 2, 4]

    expect(_slice(array, 0, 3)).toEqual([1, 2, 4])
  })
})
