export default class PassageMetadataError extends Error {
    public scope: { [key: string]: any } = {}

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, PassageMetadataError.prototype);
    }

    public static fromPreviousError(previousError: Error, scope: { [key: string]: string} = {}): PassageMetadataError {
        const error = new PassageMetadataError(previousError.message);
        error.stack = previousError.stack;
        error.scope = {
            ...scope,
            ...(previousError instanceof PassageMetadataError) ? previousError.scope : {}
        };

        return error;
    }
}
