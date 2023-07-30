const prependZero = value => {
  if (value > 9) return `${value}`
  return `0${value}`
}

export default prependZero
