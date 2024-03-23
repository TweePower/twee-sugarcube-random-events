import TypeChecker from "../tools/TypeChecker";
import LimitationStrategy from "../model/LimitationStrategy";
import TagsManager from "../TagsManager";
import { LimitationStrategyPassageMetadataType } from "../type/PassageMetadata";
import LimitationStrategyList from "../model/LimitationStrategyList";
import Tags from "../Tags";

export default class LimitationStrategyFactory {
    constructor(private tagsManager: TagsManager) {
    }

    createLimitationStrategyListFromPassageMetadata(limitationStrategyPassageMetadata: LimitationStrategyPassageMetadataType[]) {

        if (limitationStrategyPassageMetadata === undefined) {
            return new LimitationStrategyList([]);
        } else {
            if (!TypeChecker.isArray(limitationStrategyPassageMetadata)) {
                throw new Error(`"passageMetadata.limitationStrategy" should be array`);
            }

            const limitationStrategyList = new LimitationStrategyList(limitationStrategyPassageMetadata.map(
                (limitationStrategyPassageMetadataItem: LimitationStrategyPassageMetadataType) => {
                    return this.createLimitationStrategyFromPassageMetadata(limitationStrategyPassageMetadataItem);
                }
            ))

            const tagsValidation: { [key: string]: boolean } = {};
            limitationStrategyList.all().forEach((limitationStrategy: LimitationStrategy) => {
                const tagsStringKey = this.tagsManager.convertTagsToStringKey(limitationStrategy.tags);
                if (tagsValidation[tagsStringKey] !== undefined) {
                    throw new Error(`"passageMetadata.limitationStrategy" should containg uniq tag sets (tags: "${limitationStrategy.tags.tags.map(tag => tag.tag).join('", "')}")`);
                }

                tagsValidation[tagsStringKey] = true;
            });

            return limitationStrategyList;
        }
    }

    createLimitationStrategyFromPassageMetadata(limitationStrategyPassageMetadata: LimitationStrategyPassageMetadataType): LimitationStrategy {
        if (!TypeChecker.isInteger(limitationStrategyPassageMetadata.max)) {
            throw new Error(`"passageMetadata.limitationStrategy[...].max" should be integer`);
        }
        if (limitationStrategyPassageMetadata.max < 0) {
            throw new Error(`"passageMetadata.limitationStrategy[...].max" should equal or greater than 0`);
        }

        if (limitationStrategyPassageMetadata.isSeparate !== undefined && !TypeChecker.isBoolean(limitationStrategyPassageMetadata.isSeparate)) {
            throw new Error(`"passageMetadata.limitationStrategy[...].isSeparate" should be boolean`);
        }

        return new LimitationStrategy(
            limitationStrategyPassageMetadata.max,
            limitationStrategyPassageMetadata.isSeparate ?? false,
            Tags.createFromTagsDefinition(limitationStrategyPassageMetadata.tags)
        );
    }
}
