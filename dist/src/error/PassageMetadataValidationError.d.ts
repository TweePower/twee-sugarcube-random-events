export default class PassageMetadataValidationError extends Error {
    private _passageName;
    private _path;
    private _expected;
    private _actual;
    constructor(message: string, passageName?: string | null, path?: (string | number)[], expected?: any | null, actual?: any | null);
    static fromPreviousError(previousError: Error, passageName?: string | null, path?: (string | number)[]): PassageMetadataValidationError;
    get passageName(): string | null;
    get path(): (string | number)[];
    get expected(): any | null;
    get actual(): any | null;
}
//# sourceMappingURL=PassageMetadataValidationError.d.ts.map