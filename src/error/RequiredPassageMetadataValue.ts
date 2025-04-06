import PassageMetadataValidationError from "./PassageMetadataValidationError";

export default class RequiredPassageMetadataValue extends PassageMetadataValidationError {
    constructor(
        condition: string | null,
        passageName: string | null = null,
        path: (string | number)[] = [],
        expected: any | null = null,
        actual: any | null = null,
    ) {
        if (condition === null) {
            super('Valie is required', passageName, path, expected, actual);
        } else {
            super('Valie is required when ' + condition, passageName, path, expected, actual);
        }

        Object.setPrototypeOf(this, PassageMetadataValidationError.prototype);
    }
}
