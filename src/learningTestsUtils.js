export const getArrayCollection = () => [1, 2, 3, 4]

export const getSetCollection = () => {
  const set = new Set()
  set.add(1)
  set.add(2)
  return set
}

export const getMapCollection = () => {
  const map = new Map()
  map.set('a', 1)
  map.set('b', 2)
  return map
}