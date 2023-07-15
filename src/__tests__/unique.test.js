import _unique from '../utils/unique'

// TODO: write test cases for bad inputs as well
describe('_unique()', () => {
  test('will pick first unique entry and remove repeated occurences', () => {
    expect(_unique([1, 2, 1, 4, 5, 4])).toEqual([1, 2, 4, 5])
  })

  test('works same way for string iterals as well', () => {
    expect(_unique(['1', '2', '1', '4', '5', '4'])).toEqual(['1', '2', '4', '5'])
  })

  test('works only for literal values by default, will return objects as they are', () => {
    const array = [{ a: 2 }, { a: 1 }, { a: 2 }]
    expect(_unique(array)).toEqual(array)
  })
})
