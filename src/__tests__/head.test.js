import _head from '../utils/head'

describe('_head()', () => {
  test('will return first entry from the list', () => {
    const array = [1, 2, 1, 4, 5, 4]
    expect(_head(array)).toBe(1)
  })

  test.each([null, undefined, 1])('returns undefined if passed value is not an array', (collection) => {
    expect(_head(collection)).toBeUndefined()
  })
})
