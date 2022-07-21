import _differenceWith from '../utils/differenceWith'

describe('_differenceWith(array, values, comparatorFn)', () => {
  test('calls comparator function with each element in first array and each element from second array to perform matching operation', () => {
    const arr = [1, 2, 3]
    const values = [1, 2]

    const mockFn = jest.fn()
    _differenceWith(arr, values, mockFn)

    expect(mockFn.mock.calls.length).toBe(6)
    expect(mockFn.mock.calls[0]).toEqual([1, 1])
    expect(mockFn.mock.calls[3]).toEqual([2, 2])
    expect(mockFn.mock.calls[5]).toEqual([3, 2])
  })

  test('returns elements from first array after removing those elements for which comparator returns true for atleast one value from second array', () => {
    const arr = [1, 2, 3]
    const values = [1, 2]

    const comparator = (arrElement, valuesElement) => {
      return arrElement === valuesElement
    }
    expect(_differenceWith(arr, values, comparator)).toEqual([3])
  })

  test('comparator is not run with all second array values once it returns true for a value from first array', () => {
    const comparator = jest.fn((arrElement, valuesElement) => {
      return arrElement === valuesElement
    })
    _differenceWith([1, 2, 3], [1, 2], comparator)

    expect(comparator.mock.calls.length).toBe(5)
  })

  test('doesnt remove any value from first array if comparator doesnt return anything', () => {
    const array = [1, 2, 3]
    const values = [1, 2]

    expect(_differenceWith(array, values, () => { })).toStrictEqual(array)
  })

  test('assumes that comparator always returned true when passes comparator value is falsey', () => {
    const array = [1, 2, 3]
    const values = [1, 2]

    expect(_differenceWith(array, values, null)).toStrictEqual([3])
    expect(_differenceWith(array, values, undefined)).toStrictEqual([3])
    expect(_differenceWith(array, values, false)).toStrictEqual([3])
    expect(_differenceWith(array, values, 0)).toStrictEqual([3])
    expect(_differenceWith(array, values, NaN)).toStrictEqual([3])
    expect(_differenceWith(array, values, '')).toStrictEqual([3])
  })

  test('throws typeError when passesd comparator is not function but a truthy value', () => {
    const array = [1, 2, 3]
    const values = [1, 2]

    expect(() => _differenceWith(array, values, 1)).toThrow(TypeError)
    expect(() => _differenceWith(array, values, -1)).toThrow(TypeError)
    expect(() => _differenceWith(array, values, true)).toThrow(TypeError)
    expect(() => _differenceWith(array, values, {})).toThrow(TypeError)
    expect(() => _differenceWith(array, values, 'qwerty')).toThrow(TypeError)
  })

  test('doesnt run comparator when second array is not an array or is empty array', () => {
    const comparator = jest.fn((arrElement, valuesElement) => {
      return arrElement == valuesElement
    })
    _differenceWith([1, 2, 3], null, comparator)
    _differenceWith([1, 2, 3], [], comparator)

    expect(comparator.mock.calls.length).toBe(0)
  })

  test('returns values from first array as these are when second array is not an array or is empty array', () => {
    const comparator = (arrElement, valuesElement) => {
      return arrElement == valuesElement
    }

    expect(_differenceWith([1, 2, 3], null, comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], 1, comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], undefined, comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], '1', comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], '', comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], {}, comparator)).toStrictEqual([1, 2, 3])
    expect(_differenceWith([1, 2, 3], [], comparator)).toStrictEqual([1, 2, 3])
  })

  test('doesnt run comparator when first array is not an array or is empty array', () => {
    const comparator = jest.fn((arrElement, valuesElement) => {
      return arrElement == valuesElement
    })
    _differenceWith(null, [1, 2], comparator)
    _differenceWith([], [1, 2], comparator)

    expect(comparator.mock.calls.length).toBe(0)
  })

  test('returns new array even when comparator didnt run (so basically returns new array always)', () => {
    const comparator = jest.fn((arrElement, valuesElement) => {
      return arrElement == valuesElement
    })
    const inputArray = []
    const resultArray = _differenceWith(inputArray, null, comparator)

    expect(resultArray).not.toBe(inputArray)
  })

  test('returns empty array when first array is not an array or empty array already', () => {
    const comparator = (arrElement, valuesElement) => {
      return arrElement === valuesElement
    }

    expect(_differenceWith(null, [1, 2], comparator)).toStrictEqual([])
    expect(_differenceWith(undefined, [1, 2], comparator)).toStrictEqual([])
    expect(_differenceWith(1, [1, 2], comparator)).toStrictEqual([])
    expect(_differenceWith('1', [1, 2], comparator)).toStrictEqual([])
    expect(_differenceWith({}, [1, 2], comparator)).toStrictEqual([])
    expect(_differenceWith([], [1, 2], comparator)).toStrictEqual([])
  })

})
