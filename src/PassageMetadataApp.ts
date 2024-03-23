import {default as BasePassageMetadataApp} from "./PassageMetadata/PassageMetadataApp";
import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataFactory from "./factory/PassageMetadataFactory";
import TagsManager from "./TagsManager";
import LimitationStrategyFactory from "./factory/LimitationStrategyFactory";
import SugarcubeFacade from "./facade/SugarcubeFacade";

export default class PassageMetadataApp extends BasePassageMetadataApp {
    public passageMetadataCollection: PassageMetadataCollection;
    public passageMetadataFactory: PassageMetadataFactory;

    constructor(
        private tagsManager: TagsManager,
        private limitationStrategyFactory: LimitationStrategyFactory,
        sugarcubeFacade: SugarcubeFacade,
        passageMetadataRegex: RegExp = /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        mode: string = 'byTag',// all
        modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
        super(sugarcubeFacade, passageMetadataRegex, mode, modeParams);
    }

    public createPassageMetadataCollection(): PassageMetadataCollection {
        return new PassageMetadataCollection(this.tagsManager);
    }

    public createPassageMetadataFactory(): PassageMetadataFactory {
        return new PassageMetadataFactory(this.limitationStrategyFactory);
    }

    public collect(): void {
        super.collect();
        this.passageMetadataCollection.cleanUp();
    }
}
