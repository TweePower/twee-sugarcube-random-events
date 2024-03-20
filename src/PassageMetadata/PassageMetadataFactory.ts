import PassageMetadata from "./model/PassageMetadata";

export default class PassageMetadataFactory {
    public create(passageMetadataObject: { name: string }): PassageMetadata {
        return new PassageMetadata(
            passageMetadataObject.name,
            passageMetadataObject
        );
    }
}
