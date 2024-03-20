import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataCollector from "./PassageMetadataCollector";
import PassageMetadataFactory from "./PassageMetadataFactory";
import PassageMetadataError from "./error/PassageMetadataError";

export default class PassageMetadataApp {
    public passageMetadataCollection: PassageMetadataCollection;
    public passageMetadataFactory: PassageMetadataFactory;
    public passageMetadataCollector: PassageMetadataCollector;

    constructor(
        passageMetadataRegex: RegExp = /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        mode: string = 'byTag',// all
        modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
        this.passageMetadataCollection = this.createPassageMetadataCollection();
        this.passageMetadataFactory = this.createPassageMetadataFactory();

        this.passageMetadataCollector = new PassageMetadataCollector(
            passageMetadataRegex,
            mode,
            modeParams
        );
    }

    public createPassageMetadataCollection(): PassageMetadataCollection {
        return new PassageMetadataCollection();
    }

    public createPassageMetadataFactory(): PassageMetadataFactory {
        return new PassageMetadataFactory();
    }

    public collect(): void {
        try {
            this.passageMetadataCollector.collect(this.passageMetadataCollection, this.passageMetadataFactory);
        } catch (error) {
            if (error instanceof PassageMetadataError) {
                error.message += " (" + Object.keys(error.scope).map(scopeKey => `${scopeKey}: ${error.scope[scopeKey]}`).join(', ');
            }

            throw error;
        }
    }
}
