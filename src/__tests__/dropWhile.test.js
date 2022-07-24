import _dropWhile from '../utils/dropWhile'
import _isArray from '../utils/isArray'

// TODO: come back to this util once i understand _.matches, _.matchesProperty, _.property utils
//      to write test-cases for examples where some shorthand for these properties are used
describe('_dropWhile(array, function)', () => {
  test('removes elements from start while the passed function returns a truthy value', () => {
    expect(_dropWhile([1, 2, 3], () => true)).toStrictEqual([])
    expect(_dropWhile([1, 2, 3], () => 1)).toStrictEqual([])
    expect(_dropWhile([1, 2, 3], () => { return {} })).toStrictEqual([])
  })

  test('calls the function with 3 arguments (element, index, array)', () => {
    const users = [
      { 'user': 'barney', 'active': false },
      { 'user': 'fred', 'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const func = jest.fn()
    _dropWhile(users, func)

    expect(func.mock.calls[0].length).toBe(3)
    expect(func.mock.calls[0][0]).toStrictEqual({ 'user': 'barney', 'active': false })
    expect(typeof func.mock.calls[0][1] === 'number').toBeTruthy()
    expect(_isArray(func.mock.calls[0][2])).toBeTruthy()
  })

  test('removes elements from start while the passed function returns a truthy value', () => {
    const users = [
      { 'user': 'barney', 'active': false },
      { 'user': 'fred', 'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const func = (user) => !user.active

    expect(_dropWhile(users, func)).toStrictEqual([{ 'user': 'pebbles', 'active': true }])
  })

  test('drops all elements if no function is passed', () => {
    expect(_dropWhile([1, 2, 3, 4])).toStrictEqual([])
  })

  test('returns empty array when non array like value is passed as first argument', () => {
    expect(_dropWhile(null, () => { })).toStrictEqual([])
    expect(_dropWhile(undefined, () => { })).toStrictEqual([])
    expect(_dropWhile(1, () => { })).toStrictEqual([])
    expect(_dropWhile(false, () => { })).toStrictEqual([])
  })

  test('when a string is passed instead of array then it treats that string as an array which has elements as the string characters', () => {
    expect(_dropWhile('1212', (_, index) => { return index !== 1 })).toStrictEqual(['2', '1', '2'])
  })

})