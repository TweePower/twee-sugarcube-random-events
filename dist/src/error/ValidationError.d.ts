export default class ValidationError extends Error {
    private _path;
    private _expected;
    private _actual;
    constructor(message: string, path?: string[], expected?: any | null, actual?: any | null);
    static fromPreviousError(previousError: Error, path?: string[], expected?: any | null, actual?: any | null): ValidationError;
    get path(): string[];
    get expected(): any | null;
    get actual(): any | null;
}
//# sourceMappingURL=ValidationError.d.ts.map