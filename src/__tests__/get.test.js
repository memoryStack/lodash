import _get from '../utils/get';
import { getArrayCollection, getMapCollection, getSetCollection } from '../learningTestsUtils';

describe('_get(object, path, defaultValue)', () => {
  test('returns value at given path in object', () => {
    const object = { a: 1, b: { c: 3 } }

    expect(_get(object, 'b.c')).toBe(3)
  })

  test('accepts a default value as argument and returns it when value at path is resolved to undefined', () => {
    const object = { a: 1, b: { c: 3 } }

    expect(_get(object, 'b.c.d')).toBeUndefined()
    expect(_get(object, 'b.c.d', 'default')).toBe('default')
  })

  test('returns default value even when value at path is defined as undefined', () => {
    const object = { a: 1, b: { c: 3, d: undefined } }

    expect(_get(object, 'b.d', 'default')).toBe('default')
  })

  test('accepts path as string or an array', () => {
    const object = { b: { c: 3 } }

    expect(_get(object, 'b.c')).toBe(3)
    expect(_get(object, ['b', 'c'])).toBe(3)
  })

  test('accepts number as path if string format of that number is a key in object', () => {
    const object = { '1': '1' }

    expect(_get(object, '1')).toBe('1')
    expect(_get(object, 1)).toBe('1')
  })

  test('works for array as well with different formats of path', () => {
    const object = [1, { a: { b: 2 } }, 3, 4]

    expect(_get(object, '1.a.b')).toBe(2)
    expect(_get(object, '[1].a.b')).toBe(2)
    expect(_get(object, ['1', 'a', 'b'])).toBe(2)
    expect(_get(object, [1, 'a', 'b'])).toBe(2)
  })

  test('works for array as well with different formats of path', () => {
    const object = [1, { a: { b: 2 } }, 3, 4]

    expect(_get(object, '1.a.b')).toBe(2)
    expect(_get(object, '[1].a.b')).toBe(2)
    expect(_get(object, ['1', 'a', 'b'])).toBe(2)
    expect(_get(object, [1, 'a', 'b'])).toBe(2)
  })

  test('returns undefined for map collection', () => {
    const map = getMapCollection()

    expect(_get(map, 'a')).toBeUndefined()
  })
});

describe('object is bad', () => {
  test('treats string as an array', () => {
    expect(_get('qwerty', '1')).toBe('w')
  })

  test.each([null, undefined, NaN, 1])('returns undefined when object is primitive value', (object) => {
    expect(_get(object, 'a')).toBeUndefined()
  })
})

describe('path is bad', () => {
  test('path doesnt exist then will return undefined or default value of choice', () => {
    const object = {}
    expect(_get(object, 'a.b')).toBeUndefined()
  })

  test.each([null, undefined, NaN])('returns undefined when path is a bad null, undefined or NaN type of value', (path) => {
    expect(_get({}, path)).toBe()
  })

  test.each([null, undefined, NaN])('treats these bad path values as legit keys when object have them defined', (path) => {
    const object = { null: '', undefined: '', NaN: '' }

    expect(_get(object, path)).toBe('')
  })
})