import _unique from '../utils/unique'

describe('_unique()', () => {
  test('will pick first unique entry and remove repeated occurences', () => {
    expect(_unique([1, 2, 1, 4, 5, 4])).toEqual([1, 2, 4, 5])
  })

  test('works only for literal values by default', () => {
    const array = [{ a: 2 }, { a: 1 }, { a: 2 }]
    expect(_unique(array)).toEqual(array)
  })

  test('for objects equality comparison we can pass property name', () => {
    const input = [{ a: 2 }, { a: 1 }, { a: 2 }]
    const expectedResult = [{ a: 2 }, { a: 1 }, { a: 2 }]
    expect(_unique(input, 'a')).toEqual(expectedResult)
  })
})
