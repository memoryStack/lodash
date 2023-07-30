import _sortNumbers from "../utils/sortNumbers";

describe('sortNumbers(array of numbers)', () => {
  test('will sort the array in the same memory', () => {
    const array = [4, 2, 6, 7, 3, 2]
    _sortNumbers(array)
    expect(array).toEqual([2, 2, 3, 4, 6, 7])
  })
})
