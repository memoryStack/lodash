import _last from '../utils/last'

describe('_last()', () => {
  test('will return first entry from the list', () => {
    const array = [1, 2, 4]
    expect(_last(array)).toBe(4)
  })

  test.each([null, undefined, 1])('returns undefined if passed value is not an array', (collection) => {
    expect(_last(collection)).toBeUndefined()
  })
})
