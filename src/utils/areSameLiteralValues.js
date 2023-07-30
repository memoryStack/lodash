import _unique from './unique'

const areSameLiteralValues = array => _unique(array).length === 1

export default areSameLiteralValues
