import _memoize from '../utils/memoize'
import _isFunction from '../utils/isFunction'

describe('_memoize()', () => {
  test('returns a function after memoizing passed function', () => {
    expect(_isFunction(_memoize(() => { }))).toBeTruthy()
  })

  test('stores result for arguments in a map and doesnt call heavy function for same arguments and returns cached result for those arguments', () => {
    // TODO: make a test design language wrappoer for this kind of spying
    const heavyComputationFunc = jest.spyOn({ func: (a, b) => a + b }, 'func')
    const memoized = _memoize(heavyComputationFunc)

    expect(memoized(1, 2)).toBe(3)
    expect(memoized(2, 3)).toBe(5)
    expect(memoized(1, 2)).toBe(3)
    expect(heavyComputationFunc.mock.calls.length).not.toBe(3)
  })

  test('by default considers first argument as map cache key and doesnt run func if other arguments are changed', () => {
    const heavyComputationFunc = jest.spyOn({ func: (a, b) => a + b }, 'func')
    const memoized = _memoize(heavyComputationFunc)

    expect(memoized(1, 2)).toBe(3)
    expect(memoized(2, 3)).toBe(5)
    expect(memoized(1, 3)).not.toBe(4)
    expect(heavyComputationFunc.mock.calls.length).not.toBe(3)
  })

  test('accepts a key resolver to generate unique cache keys for arguments to store result of heavy function against these arguments and calls function only if function is not called already for a key', () => {
    const heavyComputationFunc = jest.spyOn({ func: (a, b) => a + b }, 'func')
    const keyResolver = (a, b) => [a, b].join('+')
    const memoized = _memoize(heavyComputationFunc, keyResolver)

    expect(memoized(1, 2)).toBe(3)
    expect(memoized(2, 3)).toBe(5)
    expect(memoized(2, 4)).toBe(6)
    expect(heavyComputationFunc.mock.calls.length).toBe(3)
  })
})

describe('unexpected keyResolver value', () => {
  test.each([null, undefined])('falls back to first argument rule for map cache key when keyResolver is passed as null or undefined', (keyResolver) => {
    const heavyComputationFunc = (a, b) => a + b
    const memoized = _memoize(heavyComputationFunc, keyResolver)

    expect(memoized(1, 2)).toBe(3)
    expect(memoized(2, 3)).toBe(5)
    expect(memoized(2, 4)).not.toBe(6)
  })

  test.each(['qwerty', 1, {}, [1]])('throws type error when keyResolver is not a function', (keyResolver) => {
    const heavyComputationFunc = (a, b) => a + b
    expect(() => _memoize(heavyComputationFunc, keyResolver)).toThrow(TypeError)
  })

})

/*
  i wonder what DS is working underneath for hashmap.
  it has three structures for caching
      1. hash
      2. map
      3. string has or map kind of thing
    can we know in which scnerio which will be used ??
    and write test-cases for it.
*/