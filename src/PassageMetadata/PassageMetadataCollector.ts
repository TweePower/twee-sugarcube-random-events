import PassageMetadataCollection from "./PassageMetadataCollection";
import PassageMetadataError from "./error/PassageMetadataError";
import PassageMetadataFactory from "./PassageMetadataFactory";
import SugarcubeFacade from "../facade/SugarcubeFacade";

export default class PassageMetadataCollector {
    constructor(
        public sugarcubeFacade: SugarcubeFacade,
        public passageMetadataRegex: RegExp = /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        public mode: string = 'byTag',// all
        public modeParams: { filterTag?: string } = { filterTag: 'passage_metadata' }
    ) {
    }

    collect(
        passageMetadataCollection: PassageMetadataCollection,
        passageMetadataFactory: PassageMetadataFactory,
    ) {
        let passages = this.sugarcubeFacade.getAllPassages();

        if (this.mode === 'byTag') {
            if (typeof this.modeParams.filterTag !== 'string') {
                throw new PassageMetadataError('modeParams.filterTag should be string');
            }

            passages = passages.filter(passge => passge.tags.includes(this.modeParams.filterTag) );
        }

        passages.forEach((passage) => {
            this.passageMetadataRegex.lastIndex = 0;
            const passageMetadataRegexResult = this.passageMetadataRegex.exec(passage.element.textContent);
            if (this.mode === 'byTag' && passageMetadataRegexResult === null) {
                throw new PassageMetadataError(`Passage metadata not found in ${passage.title}`);
            }

            try {
                const passageMetadataEvalResult = this.createPassageMetadataObject(passageMetadataRegexResult[1]);
                passageMetadataEvalResult.name = passage.title;

                passageMetadataCollection.add(passageMetadataFactory.create(passageMetadataEvalResult));
            } catch (error) {
                throw PassageMetadataError.fromPreviousError(error, {'passage': passage.title});
            }

            // remove definition from passage
            passage.element.textContent = passage.element.textContent.replace(passageMetadataRegexResult[0], '');
        });
    }

    public createPassageMetadataObject(passageMetadata: string): { name: string } {
        let passageMetadataEvalResult: { name: string };

        try {
            eval('passageMetadataEvalResult = ' + passageMetadata);

            if (
                typeof passageMetadataEvalResult !== 'object'
                || Array.isArray(passageMetadataEvalResult)
                || passageMetadataEvalResult === null
            ) {
                throw new PassageMetadataError("Passage metadata JSON should contain object");
            }
        } catch (error) {
            throw new PassageMetadataError(`Invalid passage metadata JSON: ${error.message}`);
        }

        return passageMetadataEvalResult;
    }
}
