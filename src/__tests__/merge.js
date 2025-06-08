import _merge from '../utils/merge'

test('merges the source object into destination object', () => {
    const destination = { 
        a: 1,
    }
    const sourceA = {
        a: 2,
        b: 3
    }

    const expected = {
        a: 2,
        b: 3
    }
    expect(_merge(destination, sourceA)).toStrictEqual(expected)

})

test("retains the value of destination object if value at property doesn't exist in source object", () => {
    const destination = { a: 1 }
    const sourceA = { b: 3 }
    const expected = { a: 1, b: 3 }
    expect(_merge(destination, sourceA)).toStrictEqual(expected)
})

test('will merge objects recursively in case of nested objects', () => {
    const destination = { 
        a: { c: { d: 23908 }, e: 234 }
    }
    const sourceA = {
        b: 3,
        a: {
            c: 234
        }
    }

    const expected = {
        b: 3,
        a: {
            c: 234,
            e: 234
        }
    }

    expect(_merge(destination, sourceA)).toStrictEqual(expected)
})

test('can merge multiple objects as well and the later ones will take prescedence', () => {
    const destination = { a: { c: { d: 23908 }, e: 234 } }
    const sourceA = {
        b: 3,
        a: {
            c: 234
        }
    }
    const sourceB = {
        b: 45,
        g: { t: 123 }
    }

    const expected = {
        b: 45,
        a: {
            c: 234,
            e: 234
        },
        g: { t: 123 }
    }

    expect(_merge(destination, sourceA, sourceB)).toStrictEqual(expected)
})
