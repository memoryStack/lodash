import _pullAt from '../utils/pullAt'

describe('_pullAt()', () => {
  test('will pick entries from array at given indexes', () => {
    const array = [1, 2, 1, 4, 5, 4]
    const indexes = [0, 4]
    expect(_pullAt(array, indexes)).toEqual([1, 5])
  })

  test('will remove values at given indexes from input array', () => {
    const array = [1, 2, 1, 4, 5, 4]
    const indexes = [0, 4]
    _pullAt(array, indexes)
    expect(array).toEqual([2, 1, 4, 4])
  })
})
