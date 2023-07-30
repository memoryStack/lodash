import _inRange from 'lodash/inRange'

export default (value, { start, end }) => {
  return _inRange(value, start, end + 1)
}
