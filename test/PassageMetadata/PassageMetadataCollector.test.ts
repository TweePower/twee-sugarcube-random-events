import PassageMetadata from "../../src/PassageMetadata/model/PassageMetadata";
import PassageMetadataFactory from "../../src/PassageMetadata/PassageMetadataFactory";
import PassageMetadataCollection from "../../src/PassageMetadata/PassageMetadataCollection";
import PassageMetadataCollector from "../../src/PassageMetadata/PassageMetadataCollector";
import SugarcubeFacade from "../fixtures/SugarcubeFacadeMock";

test('success create PassageMetadata', async () => {
    const sugarcubeFacade = new SugarcubeFacade();
    sugarcubeFacade.setPassagesList([
        sugarcubeFacade.createPassage('test1', ['passage_metadata'], 'my test content', {
            isEnabled: true,
            type: "goto",
        }),
    ]);
    const passageMetadataCollector = new PassageMetadataCollector(sugarcubeFacade);
    const passageMetadataCollection = new PassageMetadataCollection();
    const passageMetadataFactory = new PassageMetadataFactory();

    passageMetadataCollector.collect(passageMetadataCollection, passageMetadataFactory);

    const passageMetadata = passageMetadataCollection.get('test1');

    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
    expect(passageMetadata.name).toBe('test1');
    expect(passageMetadata.metadata).toStrictEqual({
        name: "test1",
        isEnabled: true,
        type: "goto",
    });
    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
    expect(passageMetadata).toBeInstanceOf(PassageMetadata);
});
