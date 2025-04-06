export function isString(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof variable === 'string' || variable instanceof String;
}

export function isBoolean(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof variable == "boolean" || variable instanceof Boolean;
}

export function isArray(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Object.prototype.toString.call(variable) === '[object Array]';
}

export function isInteger(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isNumber(variable) && variable % 1 === 0;
}

export function isFloat(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isNumber(variable) && variable % 1 !== 0;
}

export function isNumber(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof variable === 'number' && !isNaN(variable);
}

export function isStringInteger(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isString(variable) && !isNaN(variable) && isInteger(parseFloat(variable));
}

export function isStringFloat(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isString(variable) && !isNaN(variable) && isFloat(parseFloat(variable));
}

export function isStringNumber(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isString(variable) && !isNaN(variable) && isNumber(parseFloat(variable));
}

export function isObject(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
}

export function isTweeScript(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return isString(variable) && !(/^\w+[\w_\- ]+$/.test(variable));
}
