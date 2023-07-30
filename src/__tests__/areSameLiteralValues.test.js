import areSameLiteralValues from "../utils/areSameLiteralValues";

describe('areSameLiteralValues(array of literal values)', () => {
  test('will return true when all the values are same', () => {
    expect(areSameLiteralValues([1, 1, 1, 1, 1])).toBeTruthy()
    expect(areSameLiteralValues(['a', 'a', 'a', 'a'])).toBeTruthy()
    expect(areSameLiteralValues([true, true])).toBeTruthy()
    expect(areSameLiteralValues([true])).toBeTruthy()
  })

  test('will return false when all the values are not same', () => {
    expect(areSameLiteralValues([1, 1, 2, 1])).toBeFalsy()
    expect(areSameLiteralValues(['a', 'a', 'b', 'a'])).toBeFalsy()
    expect(areSameLiteralValues([true, false])).toBeFalsy()
  })

  test('dont pass object values, it will always return false', () => {
    const array = [{ a: 4 }, { a: 4 }]

    expect(areSameLiteralValues(array)).toBeFalsy()
  })
})
