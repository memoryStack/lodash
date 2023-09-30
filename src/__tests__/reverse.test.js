import _reverse from '../utils/reverse';

describe('_reverse(array)', () => {
  test('will return reversed array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const expectedArray = [5, 4, 3, 2, 1];
    expect(_reverse(inputArray)).toEqual(expectedArray);
  });

  test('returned reversed array has same reference as input array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    expect(_reverse(inputArray) === inputArray).toBe(true);
  });

  test('should reverse an array of strings', () => {
    const inputArray = ['apple', 'banana', 'cherry'];
    const expectedArray = ['cherry', 'banana', 'apple'];
    expect(_reverse(inputArray)).toEqual(expectedArray);
  });

  test('will modify the original array', () => {
    const inputArray = [1, 2, 3];
    _reverse(inputArray);
    expect(inputArray).toEqual([3, 2, 1]);
  });

  test('should return an empty array for an empty input array', () => {
    const inputArray = [];
    expect(_reverse(inputArray)).toEqual([]);
  });

  test('will reverse an array without reversing its nested array', () => {
    const inputArray = [1, [2, 3], 4];
    const expectedArray = [4, [2, 3], 1];
    expect(_reverse(inputArray)).toEqual(expectedArray);
  });
});

describe('_reverse with bad inputs', () => {
  test('will throw an error if passed value is a string', () => {
    expect(() => { _reverse('sfjkhs') }).toThrow();
  });

  test('should return the same object for an object input', () => {
    const inputArray = { a: 1, b: 2, c: 3 };
    const reversedArray = _reverse(inputArray);
    expect(reversedArray).toEqual(inputArray);
  });

  test.each([undefined, null])('returns as it is for nil values', (value) => {
    expect(_reverse(value)).toEqual(value);
  })

  test('will return an object representation if a number is passed', () => {
    const inputArray = 12;
    const reversedArray = _reverse(inputArray);
    expect(reversedArray).toEqual(new Number(12));
  });
})