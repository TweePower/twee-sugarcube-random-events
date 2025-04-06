import PassageMetadataValidationError from "./PassageMetadataValidationError";

export default class InvalidPassageMetadataValueType extends PassageMetadataValidationError {
    constructor(
        passageName: string | null = null,
        path: (string | number)[] = [],
        expected: any | null = null,
        actual: any | null = null,
    ) {
        super('Invalid type', passageName, path, expected, actual);

        Object.setPrototypeOf(this, PassageMetadataValidationError.prototype);
    }
}
