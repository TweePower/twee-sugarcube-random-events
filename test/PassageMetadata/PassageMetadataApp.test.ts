import PassageMetadata from "../../src/PassageMetadata/model/PassageMetadata";
import PassageMetadataApp from "../../src/PassageMetadata/PassageMetadataApp";
import SugarcubeFacade from "../fixtures/SugarcubeFacadeMock";

test('success create run app', async () => {
    const sugarcubeFacade = new SugarcubeFacade();
    sugarcubeFacade.setPassagesList([
        sugarcubeFacade.createPassage('test1', ['passage_metadata'], 'my test content', {
            isEnabled: true,
            type: "goto",
        }),
    ]);
    const passageMetadataApp = new PassageMetadataApp(sugarcubeFacade);

    passageMetadataApp.collect();

    const passageMetadata = passageMetadataApp.passageMetadataCollection.get('test1');

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
