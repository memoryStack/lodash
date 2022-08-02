import _noop from '../utils/noop'
import _isFunction from '../utils/isFunction'

describe('_noop()', () => {
  test('_noop is a function', () => {
    expect(_isFunction(_noop)).toBeTruthy()
  })

  test('returns undefined always no matter what we pass', () => {
    expect(_noop()).toBeUndefined()
    expect(_noop(1)).toBeUndefined()
  })
})