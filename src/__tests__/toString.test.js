import _toString from '../utils/toString'

describe('_toString()', () => {
  test('returns passed string primitive or value object as it is', () => {
    expect(_toString('qwerty')).toBe('qwerty')
    expect(_toString(new String('qwerty'))).toBe('qwerty')
  })

  test('converts number primitive or object into its primitive string form', () => {
    expect(_toString(1)).toBe('1')
    expect(_toString(1.2)).toBe('1.2')
    expect(_toString(-1.2)).toBe('-1.2')
    expect(_toString(new Number(-1.2))).toBe('-1.2')
    expect(_toString(NaN)).toBe('NaN')
    expect(_toString(Infinity)).toBe('Infinity')
  })

  test('converts number primitive or object into its primitive string form', () => {
    expect(_toString(true)).toBe('true')
    expect(_toString(new Boolean(true))).toBe('true')
  })

  test('joins array elements in a string concatenated with comma', () => {
    expect(_toString([1, 2, 3])).toBe('1,2,3')
    expect(_toString([1, 2, 3, -1])).toBe('1,2,3,-1')
    expect(_toString([1, 2, 3, null])).toBe('1,2,3,null')
    expect(_toString([1, 2, 3, undefined])).toBe('1,2,3,undefined')
  })

  test.skip('converts object into what form ... ?', () => {
    expect(_toString({ a: 1 })).toBe('')
  })

  test.skip('converts set object into what form ... ?', () => {
    const set = new Set()
    set.add(1)
    set.add(false)
    set.add('qwerty')

    expect(_toString(set)).toStrictEqual()
  })

  test.skip('converts map object into what form ... ?', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    map.set('1', 3)

    expect(_toString(map)).toStrictEqual()
  })

  test('returns empty string when null and undefined', () => {
    expect(_toString(null)).toBe('')
    expect(_toString(undefined)).toBe('')
  })
})

