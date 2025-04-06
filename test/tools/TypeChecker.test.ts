import { isArray, isBoolean, isFloat, isInteger, isNumber, isObject, isStringFloat, isStringInteger, isStringNumber } from "../../src/tools/TypeChecker";

test('check isBoolean', async () => {
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean('1')).toBeFalsy();
    expect(isBoolean('1.1')).toBeFalsy();
    expect(isBoolean('foo')).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
    expect(isBoolean(new Array())).toBeFalsy();
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean(1)).toBeFalsy();
    expect(isBoolean(1.1)).toBeFalsy();
    expect(isBoolean(false)).toBeTruthy();
    expect(isBoolean(null)).toBeFalsy();
    expect(isBoolean(undefined)).toBeFalsy();
    expect(isBoolean(() => {})).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
});

test('check isFloat', async () => {
    expect(isFloat('')).toBeFalsy();
    expect(isFloat('1')).toBeFalsy();
    expect(isFloat('1.1')).toBeFalsy();
    expect(isFloat('foo')).toBeFalsy();
    expect(isFloat([])).toBeFalsy();
    expect(isFloat(new Array())).toBeFalsy();
    expect(isFloat('')).toBeFalsy();
    expect(isFloat(1)).toBeFalsy();
    expect(isFloat(1.1)).toBeTruthy();
    expect(isFloat(false)).toBeFalsy();
    expect(isFloat(null)).toBeFalsy();
    expect(isFloat(undefined)).toBeFalsy();
    expect(isFloat(() => {})).toBeFalsy();
    expect(isFloat({})).toBeFalsy();
});

test('check isInteger', async () => {
    expect(isInteger('')).toBeFalsy();
    expect(isInteger('1')).toBeFalsy();
    expect(isInteger('1.1')).toBeFalsy();
    expect(isInteger('foo')).toBeFalsy();
    expect(isInteger([])).toBeFalsy();
    expect(isInteger(new Array())).toBeFalsy();
    expect(isInteger('')).toBeFalsy();
    expect(isInteger(1)).toBeTruthy();
    expect(isInteger(1.1)).toBeFalsy();
    expect(isInteger(false)).toBeFalsy();
    expect(isInteger(null)).toBeFalsy();
    expect(isInteger(undefined)).toBeFalsy();
    expect(isInteger(() => {})).toBeFalsy();
    expect(isInteger({})).toBeFalsy();
});

test('check isNumber', async () => {
    expect(isNumber('')).toBeFalsy();
    expect(isNumber('1')).toBeFalsy();
    expect(isNumber('1.1')).toBeFalsy();
    expect(isNumber('foo')).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
    expect(isNumber(new Array())).toBeFalsy();
    expect(isNumber('')).toBeFalsy();
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(1.1)).toBeTruthy();
    expect(isNumber(false)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber(() => {})).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
});

test('check isObject', async () => {
    expect(isObject('')).toBeFalsy();
    expect(isObject('1')).toBeFalsy();
    expect(isObject('1.1')).toBeFalsy();
    expect(isObject('foo')).toBeFalsy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(new Array())).toBeFalsy();
    expect(isObject('')).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject(1.1)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
    expect(isObject({})).toBeTruthy();
});

test('check isArray', async () => {
    expect(isArray('')).toBeFalsy();
    expect(isArray('1')).toBeFalsy();
    expect(isArray('1.1')).toBeFalsy();
    expect(isArray('foo')).toBeFalsy();
    expect(isArray([])).toBeTruthy();
    expect(isArray([1,2,3])).toBeTruthy();
    expect(isArray(new Array())).toBeTruthy();
    expect(isArray(new Array(1,2,3))).toBeTruthy();
    expect(isArray('')).toBeFalsy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray(1.1)).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray(() => {})).toBeFalsy();
    expect(isArray({})).toBeFalsy();
});

test('check isStringFloat', async () => {
    expect(isStringFloat('')).toBeFalsy();
    expect(isStringFloat('1')).toBeFalsy();
    expect(isStringFloat('1.1')).toBeTruthy();
    expect(isStringFloat('foo')).toBeFalsy();
    expect(isStringFloat([1,2,3])).toBeFalsy();
    expect(isStringFloat(new Array())).toBeFalsy();
    expect(isStringFloat(new Array(1,2,3))).toBeFalsy();
    expect(isStringFloat('')).toBeFalsy();
    expect(isStringFloat(1)).toBeFalsy();
    expect(isStringFloat(1.1)).toBeFalsy();
    expect(isStringFloat(false)).toBeFalsy();
    expect(isStringFloat(null)).toBeFalsy();
    expect(isStringFloat(undefined)).toBeFalsy();
    expect(isStringFloat(() => {})).toBeFalsy();
    expect(isStringFloat({})).toBeFalsy();
});

test('check is', async () => {
    expect(isStringInteger('')).toBeFalsy();
    expect(isStringInteger('1')).toBeTruthy();
    expect(isStringInteger('1.1')).toBeFalsy();
    expect(isStringInteger('foo')).toBeFalsy();
    expect(isStringInteger([1,2,3])).toBeFalsy();
    expect(isStringInteger(new Array())).toBeFalsy();
    expect(isStringInteger(new Array(1,2,3))).toBeFalsy();
    expect(isStringInteger('')).toBeFalsy();
    expect(isStringInteger(1)).toBeFalsy();
    expect(isStringInteger(1.1)).toBeFalsy();
    expect(isStringInteger(false)).toBeFalsy();
    expect(isStringInteger(null)).toBeFalsy();
    expect(isStringInteger(undefined)).toBeFalsy();
    expect(isStringInteger(() => {})).toBeFalsy();
    expect(isStringInteger({})).toBeFalsy();
});

test('check isStringNumber', async () => {
    expect(isStringNumber('')).toBeFalsy();
    expect(isStringNumber('1')).toBeTruthy();
    expect(isStringNumber('1.1')).toBeTruthy();
    expect(isStringNumber('foo')).toBeFalsy();
    expect(isStringNumber([1,2,3])).toBeFalsy();
    expect(isStringNumber(new Array())).toBeFalsy();
    expect(isStringNumber(new Array(1,2,3))).toBeFalsy();
    expect(isStringNumber('')).toBeFalsy();
    expect(isStringNumber(1)).toBeFalsy();
    expect(isStringNumber(1.1)).toBeFalsy();
    expect(isStringNumber(false)).toBeFalsy();
    expect(isStringNumber(null)).toBeFalsy();
    expect(isStringNumber(undefined)).toBeFalsy();
    expect(isStringNumber(() => {})).toBeFalsy();
    expect(isStringNumber({})).toBeFalsy();
});
