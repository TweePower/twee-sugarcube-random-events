import PassageMetadata from "./model/PassageMetadata";

export default class PassageMetadataFactory {
    public create(passageMetadataObject: { name: string, [ key: string ]: any }): PassageMetadata { // eslint-disable-line @typescript-eslint/no-explicit-any
        return new PassageMetadata(
            passageMetadataObject.name,
            passageMetadataObject
        );
    }
}
