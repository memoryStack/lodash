import areSameValues from "../utils/areSameValues";

describe('areSameValues() with literal values', () => {
  test('will return true when all the values are same', () => {
    expect(areSameValues([1, 1, 1, 1, 1])).toBeTruthy()
    expect(areSameValues(['a', 'a', 'a', 'a'])).toBeTruthy()
    expect(areSameValues([true, true])).toBeTruthy()
    expect(areSameValues([true])).toBeTruthy()
  })

  test('will return false when all the values are not same', () => {
    expect(areSameValues([1, 1, 2, 1])).toBeFalsy()
    expect(areSameValues(['a', 'a', 'b', 'a'])).toBeFalsy()
    expect(areSameValues([true, false])).toBeFalsy()
  })
})

describe('areSameValues() with object values', () => {
  test('with object values it will always return false if property path is not passed', () => {
    expect(areSameValues([{ a: 4 }, { b: 4 }])).toBeFalsy()
    expect(areSameValues([{ a: 4 }, { a: 4 }])).toBeFalsy()
  })

  test('return false if values at property path are not same', () => {
    const list = [{ a: 4 }, { b: 4 }]
    expect(areSameValues(list, 'a')).toBeFalsy()
  })

  test('return true if values at property path are same', () => {
    const list = [
      { a: { c: 4 }, b: false },
      { a: { c: 4 }, b: true }
    ]
    expect(areSameValues(list, 'a.c')).toBeTruthy()
  })

  test('return false if values at property path are not literal values', () => {
    const list = [
      { a: { c: 4 }, b: false },
      { a: { c: 4 }, b: true }
    ]
    expect(areSameValues(list, 'a')).toBeFalsy()
  })

  test('return false if literal and object values are mixed', () => {
    expect(areSameValues([1, 1, { a: 1, b: true }], 'a')).toBeFalsy()
    expect(areSameValues([1, 1, { a: 1, b: true }])).toBeFalsy()
  })
})
