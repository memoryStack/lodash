
import _set from '../utils/set';

describe('_set(object, path, value)', () => {

  test('doesnt crash when sent value is not an object', () => {
    const keyToSet = 'a'
    const newValueForKey = 2
    _set(null, keyToSet, newValueForKey)
    _set(undefined, keyToSet, newValueForKey)
    _set(1, keyToSet, newValueForKey)
    _set(false, keyToSet, newValueForKey)
  });

  test('returns the given object after modification', () => {
    const object = { a: 1 }
    expect(_set(object, 'a', 2)).toBe(object)
  });

  test('updates value of existing key to given value in given object', () => {
    const object = { a: 1, b: 2 }
    expect(_set(object, 'a', 2)).toStrictEqual({ a: 2, b: 2 })
  });

  test('different ways of passing path', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] }
    expect(_set(object, 'a.0.b.c', 4)).toStrictEqual({ 'a': [{ 'b': { 'c': 4 } }] })
    expect(_set(object, 'a[0].b.c', 5)).toStrictEqual({ 'a': [{ 'b': { 'c': 5 } }] })
    expect(_set(object, ['a', '0', 'b', 'c'], 6)).toStrictEqual({ 'a': [{ 'b': { 'c': 6 } }] })
  });

  test('creates required path in object when path does not exist, newly created values will be of object type when path has string keywords', () => {
    const object = { a: 1, b: 2 }
    expect(_set(object, 'c.d.e', 2)).toStrictEqual({
      a: 1,
      b: 2,
      c: { d: { e: 2 } }
    })
  });

  test('if in non-existant path we have a non -ve integer then an array will be created for key just before that integer and that integer will be treated as index at which new values will be created', () => {
    expect(_set({ a: 1 }, 'c.0.d.e', 2)).toStrictEqual({
      a: 1,
      c: [{ d: { e: 2 } }]
    })

    expect(_set({ a: 1 }, 'c.2.d.e', 2)).toStrictEqual({
      a: 1,
      c: [, , { d: { e: 2 } }]
    })

    expect(_set({ a: 1 }, 'c.2.2.d.e', 2)).toStrictEqual({
      a: 1,
      c: [, , [, , { d: { e: 2 } }]]
    })
  });

  test('if in non-existant path a number is at first position in the path then a new object will be created considering that number as a key', () => {
    expect(_set({ a: 1 }, '2.2.d.e', 2)).toStrictEqual({
      a: 1,
      '2': [, , { d: { e: 2 } }]
    })
  });

  test('when in non-existant path we have negative number then value type created will be object having that negative number as key', () => {
    expect(_set({ a: 1 }, ['c', '-2', 'd', 'e'], 2)).toStrictEqual({
      a: 1,
      c: { '-2': { d: { e: 2 } } }
    })
  });

  test('doesnt change Map and Set containers', () => {
    const map = new Map()
    expect(_set(map, 'a', 2)).toStrictEqual(map)
    const setContainer = new Set()
    expect(_set(setContainer, 'a', 2)).toStrictEqual(setContainer)
  });

});
