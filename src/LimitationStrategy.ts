import TypeChecker from "./tools/TypeChecker";
import Tags from "./Tags";
import { LimitationStrategyType } from "./type/Definition";

export default class LimitationStrategy {
    constructor(
        public max: number,
        public isSeparate: boolean,
        public tags: Tags
    ) {
        if (tags.isHaveTweeScriptTags) {
            throw new Error(`"definition.limitationStrategy[...].tags" should be string`);
        }
    }

    static createFromLimitationStrategyDefinition(limitationStrategyDefinition: LimitationStrategyType): LimitationStrategy {
        if (!TypeChecker.isInteger(limitationStrategyDefinition.max)) {
            throw new Error(`"definition.limitationStrategy[...].max" should be integer`);
        }
        if (limitationStrategyDefinition.max < 0) {
            throw new Error(`"definition.limitationStrategy[...].max" should equal or greater than 0`);
        }

        if (limitationStrategyDefinition.isSeparate !== undefined && !TypeChecker.isBoolean(limitationStrategyDefinition.isSeparate)) {
            throw new Error(`"definition.limitationStrategy[...].isSeparate" should be boolean`);
        }

        return new LimitationStrategy(
            limitationStrategyDefinition.max,
            limitationStrategyDefinition.isSeparate ?? false,
            Tags.createFromTagsDefinition(limitationStrategyDefinition.tags)
        );
    }
}
