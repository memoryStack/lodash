import _clone from '../utils/clone'

describe('_clone()', () => {
  test('returns a cloned value of passed object', () => {
    const obj = { a: '1' }
    const clonedValue = _clone(obj)

    expect(clonedValue).toStrictEqual(obj)
    expect(clonedValue).not.toBe(obj)
  })

  test('cloning is shallow', () => {
    const obj = { a: '1', b: { c: 1 } }
    const clonedValue = _clone(obj)

    expect(clonedValue).toStrictEqual(obj)
    expect(clonedValue.b).toBe(obj.b)
  })

  test('returns shallow copy of array', () => {
    const arr = ['1', { c: 1 }]
    const clonedValue = _clone(arr)

    expect(clonedValue).toStrictEqual(arr)
    expect(clonedValue[1]).toBe(arr[1])
  })

  test('returns shallow copy of Map object', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', { c: 1 })
    const clonedMap = _clone(map)

    expect(clonedMap).toStrictEqual(map)
    expect(clonedMap['b']).toBe(map['b'])
  })

  test('clones set object but unlike array clones each element as well shallowly ', () => {
    const set = new Set()
    set.add({ a: { b: 1 } })
    set.add(1)
    const clonedSet = _clone(set)

    expect(clonedSet === set).toBeFalsy()
    expect(clonedSet).toStrictEqual(set)

    const setIterator = set.values();
    const clonedSetIterator = clonedSet.values();
    const firstValueFromSet = setIterator.next().value
    const firstValueFromClonedSet = clonedSetIterator.next().value

    expect(firstValueFromSet === firstValueFromClonedSet).toBeFalsy()
    expect(firstValueFromSet.a === firstValueFromClonedSet.a).toBeTruthy()
  })

  test('returns empty object when error object is passed to clone', () => {
    expect(_clone(new Error())).toStrictEqual({})
    expect(_clone(new TypeError())).toStrictEqual({})
  })

  test('returns empty object when weak map is passed', () => {
    const weakMap = new WeakMap()
    weakMap.set({}, 1)

    expect(_clone(weakMap)).toStrictEqual({})
  })

  test('returns empty object when function is passed', () => {
    const func = () => { }
    expect(_clone(func)).toStrictEqual({})
  })

  test('doesnt clone function into empty object when function is a value of object key or an element of array', () => {
    const obj = { func: () => { } }
    expect(_clone(obj).func === obj.func).toBeTruthy()

    const arr = [() => { }]
    expect(_clone(arr)[0] === arr[0]).toBeTruthy()
  })

  test('returns same value if passed value is primitive', () => {
    expect(_clone(null)).toBeNull()
    expect(_clone(undefined)).toBeUndefined()
    expect(_clone(1)).toBe(1)
    expect(_clone('')).toBe('')
    expect(_clone('1')).toBe('1')
    expect(_clone(1.2)).toBe(1.2)
    expect(_clone(true)).toBeTruthy()
    expect(_clone(false)).toBeFalsy()
  })

})