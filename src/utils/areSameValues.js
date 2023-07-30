import _uniqueBy from './uniqueBy'

const areSameValues = (array, property) => _uniqueBy(array, property).length === 1

export default areSameValues
