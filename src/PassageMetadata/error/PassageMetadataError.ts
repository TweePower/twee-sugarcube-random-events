type ScopeType = { [key: string]: string };

export default class PassageMetadataError extends Error {
    public scope: ScopeType = {}

    constructor(message: string, scope: ScopeType = {}) {
        super(message);
        this.scope = scope;
        Object.setPrototypeOf(this, PassageMetadataError.prototype);
    }

    public static fromPreviousError(previousError: Error, scope: ScopeType = {}): PassageMetadataError {
        const error = new PassageMetadataError(previousError.message);
        error.stack = previousError.stack;
        error.scope = {
            ...scope,
            ...(previousError instanceof PassageMetadataError) ? previousError.scope : {}
        };

        return error;
    }
}
