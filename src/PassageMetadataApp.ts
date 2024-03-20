import {default as BasePassageMetadataApp} from "./PassageMetadata/PassageMetadataApp";
import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataFactory from "./PassageMetadataFactory";

export default class PassageMetadataApp extends BasePassageMetadataApp {
    public passageMetadataCollection: PassageMetadataCollection;
    public passageMetadataFactory: PassageMetadataFactory;

    public createPassageMetadataCollection(): PassageMetadataCollection {
        return new PassageMetadataCollection();
    }

    public createPassageMetadataFactory(): PassageMetadataFactory {
        return new PassageMetadataFactory();
    }

    public collect(): void {
        super.collect();
        this.passageMetadataCollection.cleanUp();
    }
}
