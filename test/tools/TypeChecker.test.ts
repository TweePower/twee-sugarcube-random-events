import TypeChecker from "../../src/tools/TypeChecker";

test('check isBoolean', async () => {
    expect(TypeChecker.isBoolean('')).toBeFalsy();
    expect(TypeChecker.isBoolean('1')).toBeFalsy();
    expect(TypeChecker.isBoolean('1.1')).toBeFalsy();
    expect(TypeChecker.isBoolean('foo')).toBeFalsy();
    expect(TypeChecker.isBoolean([])).toBeFalsy();
    expect(TypeChecker.isBoolean(new Array())).toBeFalsy();
    expect(TypeChecker.isBoolean('')).toBeFalsy();
    expect(TypeChecker.isBoolean(1)).toBeFalsy();
    expect(TypeChecker.isBoolean(1.1)).toBeFalsy();
    expect(TypeChecker.isBoolean(false)).toBeTruthy();
    expect(TypeChecker.isBoolean(null)).toBeFalsy();
    expect(TypeChecker.isBoolean(undefined)).toBeFalsy();
    expect(TypeChecker.isBoolean(() => {})).toBeFalsy();
    expect(TypeChecker.isBoolean({})).toBeFalsy();
});

test('check isFloat', async () => {
    expect(TypeChecker.isFloat('')).toBeFalsy();
    expect(TypeChecker.isFloat('1')).toBeFalsy();
    expect(TypeChecker.isFloat('1.1')).toBeFalsy();
    expect(TypeChecker.isFloat('foo')).toBeFalsy();
    expect(TypeChecker.isFloat([])).toBeFalsy();
    expect(TypeChecker.isFloat(new Array())).toBeFalsy();
    expect(TypeChecker.isFloat('')).toBeFalsy();
    expect(TypeChecker.isFloat(1)).toBeFalsy();
    expect(TypeChecker.isFloat(1.1)).toBeTruthy();
    expect(TypeChecker.isFloat(false)).toBeFalsy();
    expect(TypeChecker.isFloat(null)).toBeFalsy();
    expect(TypeChecker.isFloat(undefined)).toBeFalsy();
    expect(TypeChecker.isFloat(() => {})).toBeFalsy();
    expect(TypeChecker.isFloat({})).toBeFalsy();
});

test('check isInteger', async () => {
    expect(TypeChecker.isInteger('')).toBeFalsy();
    expect(TypeChecker.isInteger('1')).toBeFalsy();
    expect(TypeChecker.isInteger('1.1')).toBeFalsy();
    expect(TypeChecker.isInteger('foo')).toBeFalsy();
    expect(TypeChecker.isInteger([])).toBeFalsy();
    expect(TypeChecker.isInteger(new Array())).toBeFalsy();
    expect(TypeChecker.isInteger('')).toBeFalsy();
    expect(TypeChecker.isInteger(1)).toBeTruthy();
    expect(TypeChecker.isInteger(1.1)).toBeFalsy();
    expect(TypeChecker.isInteger(false)).toBeFalsy();
    expect(TypeChecker.isInteger(null)).toBeFalsy();
    expect(TypeChecker.isInteger(undefined)).toBeFalsy();
    expect(TypeChecker.isInteger(() => {})).toBeFalsy();
    expect(TypeChecker.isInteger({})).toBeFalsy();
});

test('check isNumber', async () => {
    expect(TypeChecker.isNumber('')).toBeFalsy();
    expect(TypeChecker.isNumber('1')).toBeFalsy();
    expect(TypeChecker.isNumber('1.1')).toBeFalsy();
    expect(TypeChecker.isNumber('foo')).toBeFalsy();
    expect(TypeChecker.isNumber([])).toBeFalsy();
    expect(TypeChecker.isNumber(new Array())).toBeFalsy();
    expect(TypeChecker.isNumber('')).toBeFalsy();
    expect(TypeChecker.isNumber(1)).toBeTruthy();
    expect(TypeChecker.isNumber(1.1)).toBeTruthy();
    expect(TypeChecker.isNumber(false)).toBeFalsy();
    expect(TypeChecker.isNumber(null)).toBeFalsy();
    expect(TypeChecker.isNumber(undefined)).toBeFalsy();
    expect(TypeChecker.isNumber(() => {})).toBeFalsy();
    expect(TypeChecker.isNumber({})).toBeFalsy();
});

test('check isObject', async () => {
    expect(TypeChecker.isObject('')).toBeFalsy();
    expect(TypeChecker.isObject('1')).toBeFalsy();
    expect(TypeChecker.isObject('1.1')).toBeFalsy();
    expect(TypeChecker.isObject('foo')).toBeFalsy();
    expect(TypeChecker.isObject([])).toBeFalsy();
    expect(TypeChecker.isObject(new Array())).toBeFalsy();
    expect(TypeChecker.isObject('')).toBeFalsy();
    expect(TypeChecker.isObject(1)).toBeFalsy();
    expect(TypeChecker.isObject(1.1)).toBeFalsy();
    expect(TypeChecker.isObject(false)).toBeFalsy();
    expect(TypeChecker.isObject(null)).toBeFalsy();
    expect(TypeChecker.isObject(undefined)).toBeFalsy();
    expect(TypeChecker.isObject(() => {})).toBeFalsy();
    expect(TypeChecker.isObject({})).toBeTruthy();
});

test('check isArray', async () => {
    expect(TypeChecker.isArray('')).toBeFalsy();
    expect(TypeChecker.isArray('1')).toBeFalsy();
    expect(TypeChecker.isArray('1.1')).toBeFalsy();
    expect(TypeChecker.isArray('foo')).toBeFalsy();
    expect(TypeChecker.isArray([])).toBeTruthy();
    expect(TypeChecker.isArray([1,2,3])).toBeTruthy();
    expect(TypeChecker.isArray(new Array())).toBeTruthy();
    expect(TypeChecker.isArray(new Array(1,2,3))).toBeTruthy();
    expect(TypeChecker.isArray('')).toBeFalsy();
    expect(TypeChecker.isArray(1)).toBeFalsy();
    expect(TypeChecker.isArray(1.1)).toBeFalsy();
    expect(TypeChecker.isArray(false)).toBeFalsy();
    expect(TypeChecker.isArray(null)).toBeFalsy();
    expect(TypeChecker.isArray(undefined)).toBeFalsy();
    expect(TypeChecker.isArray(() => {})).toBeFalsy();
    expect(TypeChecker.isArray({})).toBeFalsy();
});

test('check isStringFloat', async () => {
    expect(TypeChecker.isStringFloat('')).toBeFalsy();
    expect(TypeChecker.isStringFloat('1')).toBeFalsy();
    expect(TypeChecker.isStringFloat('1.1')).toBeTruthy();
    expect(TypeChecker.isStringFloat('foo')).toBeFalsy();
    expect(TypeChecker.isStringFloat([1,2,3])).toBeFalsy();
    expect(TypeChecker.isStringFloat(new Array())).toBeFalsy();
    expect(TypeChecker.isStringFloat(new Array(1,2,3))).toBeFalsy();
    expect(TypeChecker.isStringFloat('')).toBeFalsy();
    expect(TypeChecker.isStringFloat(1)).toBeFalsy();
    expect(TypeChecker.isStringFloat(1.1)).toBeFalsy();
    expect(TypeChecker.isStringFloat(false)).toBeFalsy();
    expect(TypeChecker.isStringFloat(null)).toBeFalsy();
    expect(TypeChecker.isStringFloat(undefined)).toBeFalsy();
    expect(TypeChecker.isStringFloat(() => {})).toBeFalsy();
    expect(TypeChecker.isStringFloat({})).toBeFalsy();
});

test('check is', async () => {
    expect(TypeChecker.isStringInteger('')).toBeFalsy();
    expect(TypeChecker.isStringInteger('1')).toBeTruthy();
    expect(TypeChecker.isStringInteger('1.1')).toBeFalsy();
    expect(TypeChecker.isStringInteger('foo')).toBeFalsy();
    expect(TypeChecker.isStringInteger([1,2,3])).toBeFalsy();
    expect(TypeChecker.isStringInteger(new Array())).toBeFalsy();
    expect(TypeChecker.isStringInteger(new Array(1,2,3))).toBeFalsy();
    expect(TypeChecker.isStringInteger('')).toBeFalsy();
    expect(TypeChecker.isStringInteger(1)).toBeFalsy();
    expect(TypeChecker.isStringInteger(1.1)).toBeFalsy();
    expect(TypeChecker.isStringInteger(false)).toBeFalsy();
    expect(TypeChecker.isStringInteger(null)).toBeFalsy();
    expect(TypeChecker.isStringInteger(undefined)).toBeFalsy();
    expect(TypeChecker.isStringInteger(() => {})).toBeFalsy();
    expect(TypeChecker.isStringInteger({})).toBeFalsy();
});

test('check isStringNumber', async () => {
    expect(TypeChecker.isStringNumber('')).toBeFalsy();
    expect(TypeChecker.isStringNumber('1')).toBeTruthy();
    expect(TypeChecker.isStringNumber('1.1')).toBeTruthy();
    expect(TypeChecker.isStringNumber('foo')).toBeFalsy();
    expect(TypeChecker.isStringNumber([1,2,3])).toBeFalsy();
    expect(TypeChecker.isStringNumber(new Array())).toBeFalsy();
    expect(TypeChecker.isStringNumber(new Array(1,2,3))).toBeFalsy();
    expect(TypeChecker.isStringNumber('')).toBeFalsy();
    expect(TypeChecker.isStringNumber(1)).toBeFalsy();
    expect(TypeChecker.isStringNumber(1.1)).toBeFalsy();
    expect(TypeChecker.isStringNumber(false)).toBeFalsy();
    expect(TypeChecker.isStringNumber(null)).toBeFalsy();
    expect(TypeChecker.isStringNumber(undefined)).toBeFalsy();
    expect(TypeChecker.isStringNumber(() => {})).toBeFalsy();
    expect(TypeChecker.isStringNumber({})).toBeFalsy();
});
