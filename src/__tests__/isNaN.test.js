import _isNaN from '../utils/isNaN'

describe('_isNaN()', () => {
  test('returns true when NaN primitive or NaN object is passed', () => {
    expect(_isNaN(NaN)).toBeTruthy()
    expect(_isNaN(new Number(NaN))).toBeTruthy()
  })

  test('returns false when NaN value is not passed', () => {
    expect(_isNaN(null)).toBeFalsy()
    expect(_isNaN(undefined)).toBeFalsy()
    expect(_isNaN('qwerty')).toBeFalsy()
    expect(_isNaN(1)).toBeFalsy()
    expect(_isNaN({})).toBeFalsy()
    expect(_isNaN([])).toBeFalsy()
    expect(_isNaN(new Set())).toBeFalsy()
  })
})

describe('_isNaN() vs isNaN()', () => {
  test('_isNaN() and global isNaN() both returns false when a valid number is passed', () => {
    expect(_isNaN(1)).toBeFalsy()
    expect(isNaN(1)).toBeFalsy()
  })

  test('_isNaN() and global isNaN() both returns false when a string is passed whose value can be converted to valid number', () => {
    expect(_isNaN('1')).toBeFalsy()
    expect(isNaN('1')).toBeFalsy()
  })

  test('_isNaN() returns false but global isNaN() returns true when an alphabetical string is passed', () => {
    expect(_isNaN('qwerty')).toBeFalsy()
    expect(isNaN('qwerty')).toBeTruthy()
  })

  test('_isNaN() and global isNaN() both returns false when null is passed', () => {
    expect(_isNaN(null)).toBeFalsy()
    expect(isNaN(null)).toBeFalsy()
  })

  test('_isNaN() and global isNaN() both returns false when boolean is passed', () => {
    expect(_isNaN(true)).toBeFalsy()
    expect(isNaN(true)).toBeFalsy()
  })

  test('_isNaN() returns false but global isNaN() returns true when undefined is passed', () => {
    expect(_isNaN(undefined)).toBeFalsy()
    expect(isNaN(undefined)).toBeTruthy()
  })

  test('_isNaN() returns false but global isNaN() returns true when undefined is passed', () => {
    expect(_isNaN(undefined)).toBeFalsy()
    expect(isNaN(undefined)).toBeTruthy()
  })

  test('_isNaN() returns false but global isNaN() returns true when an object is passed', () => {
    expect(_isNaN({ a: 1 })).toBeFalsy()
    expect(isNaN({ a: 1 })).toBeTruthy()
  })

  test('_isNaN() and global isNaN() both returns false when array is passed', () => {
    expect(_isNaN([1])).toBeFalsy()
    expect(isNaN([1])).toBeFalsy()
  })

  test('_isNaN() returns false but global isNaN() returns true when Map object is passed', () => {
    expect(_isNaN(new Map())).toBeFalsy()
    expect(isNaN(new Map())).toBeTruthy()
  })

  test('_isNaN() returns false but global isNaN() returns true when Set object is passed', () => {
    expect(_isNaN(new Set())).toBeFalsy()
    expect(isNaN(new Set())).toBeTruthy()
  })
})  
