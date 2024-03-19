export default class TypeChecker {
    public static isString(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return typeof variable === 'string' || variable instanceof String;
    }

    public static isBoolean(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return typeof variable == "boolean" || variable instanceof Boolean;
    }

    public static isArray(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return Object.prototype.toString.call(variable) === '[object Array]';
    }

    public static isInteger(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return TypeChecker.isNumber(variable) && variable % 1 === 0;
    }

    public static isFloat(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return TypeChecker.isNumber(variable) && variable % 1 !== 0;
    }

    public static isNumber(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return typeof variable === 'number' && !isNaN(variable);
    }

    public static isStringInteger(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isInteger(parseFloat(variable));
    }

    public static isStringFloat(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isFloat(parseFloat(variable));
    }

    public static isStringNumber(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isNumber(parseFloat(variable));
    }

    public static isObject(variable: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
    }
}
