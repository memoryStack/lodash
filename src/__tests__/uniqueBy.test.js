import _uniqueBy from '../utils/uniqueBy'

describe('_uniqueBy()', () => {
  test('for objects equality comparison we can pass property name', () => {
    const input = [{ a: 2 }, { a: 1 }, { a: 2 }]
    const expectedResult = [{ a: 2 }, { a: 1 }]
    expect(_uniqueBy(input, 'a')).toEqual(expectedResult)
  })
})
