import _inRange from '../utils/inRange'

describe('_inRange(number, start, end)', () => {
  test('returns true when passed number is between start and end else false', () => {
    expect(_inRange(2, 1, 4)).toBeTruthy()
    expect(_inRange(2, 3, 4)).toBeFalsy()
  })

  test('returns false when passed number is equal to end', () => {
    expect(_inRange(4, 1, 4)).toBeFalsy()
  })

  test('sets start to 0 and end to start when end is not passed explicitly ', () => {
    expect(_inRange(4, 8)).toBeTruthy()
  })

  test('we can swap start and end arguments as well', () => {
    expect(_inRange(4, 6, 1)).toBeTruthy()
  })

  test('works for negative numbers as well', () => {
    expect(_inRange(-3, -2, -6)).toBeTruthy()
    expect(_inRange(-3, -6, -2)).toBeTruthy()
  })

  test('works for decimal numbers as well', () => {
    expect(_inRange(-1.3, -2, -6)).toBeFalsy()
    expect(_inRange(-2.3, -6, -2)).toBeTruthy()
  })

  test('works for numbers objects as well, basically number, start, end all can be Number objects', () => {
    expect(_inRange(new Number(-1.3), -2, new Number(-6))).toBeFalsy()
    expect(_inRange(new Number(-2.3), -2, new Number(-6))).toBeTruthy()
  })

  test('works if arguments are sent as number strings literals or string objects', () => {
    expect(_inRange('2', '1', '5')).toBeTruthy()
    expect(_inRange('2', '2')).toBeFalsy()
    expect(_inRange('-2', '-1', '-5')).toBeTruthy()
    expect(_inRange('-2', '-1', String('-5'))).toBeTruthy()
  })

  test('always returns false if strings with alphabets are passed', () => {
    expect(_inRange('c', 'a', 'e')).toBeFalsy()
  })

  test('always returns false nil values are passed', () => {
    expect(_inRange(null)).toBeFalsy()
    expect(_inRange(null, undefined, undefined)).toBeFalsy()
  })
})
