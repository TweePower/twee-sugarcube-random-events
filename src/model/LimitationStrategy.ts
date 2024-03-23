import Tags from "../Tags";

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
}
