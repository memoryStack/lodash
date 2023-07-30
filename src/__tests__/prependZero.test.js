import _prependZero from "../utils/prependZero"

test('_prependZero()', () => {
  expect(_prependZero(0)).toBe('00')
  expect(_prependZero(11)).toBe('11')
  expect(_prependZero(1)).toBe('01')
})
