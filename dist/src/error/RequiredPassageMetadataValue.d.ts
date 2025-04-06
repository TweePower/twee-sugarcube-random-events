import PassageMetadataValidationError from "./PassageMetadataValidationError";
export default class RequiredPassageMetadataValue extends PassageMetadataValidationError {
    constructor(condition: string | null, passageName?: string | null, path?: (string | number)[], expected?: any | null, actual?: any | null);
}
//# sourceMappingURL=RequiredPassageMetadataValue.d.ts.map