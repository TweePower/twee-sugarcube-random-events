import PassageMetadata from "../../src/PassageMetadata/model/PassageMetadata";
import PassageMetadataFactory from "../../src/PassageMetadata/PassageMetadataFactory";

test('success create PassageMetadata', async () => {
    const metadataObject = {name: 'test', foo: 'bar'};
    const factory = new PassageMetadataFactory();
    const passageMetadata = factory.create(metadataObject);
    expect(passageMetadata).toBeInstanceOf(PassageMetadata);

    expect(passageMetadata.name).toBe('test');
    expect(passageMetadata.metadata).toStrictEqual(metadataObject);
});
