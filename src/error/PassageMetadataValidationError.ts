export default class PassageMetadataValidationError extends Error {
    private _passageName: string;
    private _path: (string | number)[] = [];
    private _expected: any | null = null;
    private _actual: any | null = null;

    constructor(
        message: string,
        passageName: string | null = null,
        path: (string | number)[] = [],
        expected: any | null = null,
        actual: any | null = null,
    ) {
        super(message);

        this._passageName = passageName;
        this._path = path;
        this._expected = expected;
        this._actual = actual;

        Object.setPrototypeOf(this, PassageMetadataValidationError.prototype);
    }

    public static fromPreviousError(
        previousError: Error,
        passageName: string | null = null,
        path: (string | number)[] = [],
    ): PassageMetadataValidationError {
        path = [
            ...path,
            ...(previousError instanceof PassageMetadataValidationError) ? previousError.path : []
        ];
        passageName = passageName !== null ? passageName : (previousError instanceof PassageMetadataValidationError) ? previousError.passageName : null;

        const error = new PassageMetadataValidationError(
            previousError.message,
            passageName,
            previousError instanceof PassageMetadataValidationError ? previousError.expected : null,
            previousError instanceof PassageMetadataValidationError ? previousError.actual : null
        );
        error.stack = previousError.stack;

        return error;
    }

    get passageName(): string | null {
        return this._passageName;
    }

    get path(): (string | number)[] {
        return this._path;
    }

    get expected(): any | null {
        return this._expected;
    }

    get actual(): any | null {
        return this._actual;
    }
}
