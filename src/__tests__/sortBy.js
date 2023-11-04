import _sortBy from "../utils/sortBy";

describe('_sortBy(Array | Object)', () => {
  test('will create a new collection and sort that', () => {
    const users = [{ 'user': 'fred',   'age': 48 }]
    expect(_sortBy(users, ['user', 'age']) === users).toBe(false)
  })

  test('will sort the array objects with their properties iteratively', () => {
    const users = [
      { 'user': 'fred',   'age': 48 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred',   'age': 40 },
      { 'user': 'barney', 'age': 34 }
    ]
    const expectedResult = [
      { 'user': 'barney', 'age': 34 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred',   'age': 40 },
      { 'user': 'fred', 'age': 48 }
    ]

    expect(_sortBy(users, ['user', 'age'])).toStrictEqual(expectedResult)
  })

  test('will sort the array of numbers as well', () => {
    const numbersList = [4, 3,  5]

    expect(_sortBy(numbersList)).toStrictEqual([3, 4, 5])
  })

})
