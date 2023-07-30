import _inRange from '../utils/inRange'

describe('_inRange(number, {start, end})', () => {
  test('returns true when passed number is in range between start and end else false', () => {
    expect(_inRange(2, { start: 1, end: 4 })).toBeTruthy()
    expect(_inRange(2, { start: 3, end: 4 })).toBeFalsy()
  })

  test('returns true when passed number is equal to edge numbers', () => {
    expect(_inRange(1, { start: 1, end: 4 })).toBeTruthy()
    expect(_inRange(4, { start: 1, end: 4 })).toBeTruthy()
  })
})
