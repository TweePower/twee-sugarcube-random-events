import PassageMetadataValidationError from "./PassageMetadataValidationError";

export default class InvalidPassageMetadataValue extends PassageMetadataValidationError {
    constructor(
        passageName: string | null = null,
        path: (string | number)[] = [],
        expected: any | null = null,
        actual: any | null = null,
    ) {
        super('Invalid value', passageName, path, expected, actual);

        Object.setPrototypeOf(this, InvalidPassageMetadataValue.prototype);
    }
}
