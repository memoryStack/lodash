import _at from '../utils/at'

describe('_at()', () => {
  test('will pick entries from array at given indexes', () => {
    const array = [1, 2, 1, 4, 5, 4]
    const indexes = [0, 4]
    expect(_at(array, indexes)).toEqual([1, 5])
  })

  test('unlike _pullAt will not remove values at given indexes from input array', () => {
    const array = [1, 2, 1, 4, 5, 4]
    const indexes = [0, 4]
    _at(array, indexes)
    expect(array).toEqual([1, 2, 1, 4, 5, 4])
  })
})
