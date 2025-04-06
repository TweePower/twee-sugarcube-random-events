import LimitationStrategy from "../model/LimitationStrategy";
import { LimitationStrategyPassageMetadataType } from "../type/PassageMetadata";
import TagListFactory from "./TagListFactory";
export default class LimitationStrategyFactory {
    private tagListFactory;
    constructor(tagListFactory: TagListFactory);
    createFromPassageMetadataObject(limitationStrategyMetadata?: LimitationStrategyPassageMetadataType | any): LimitationStrategy;
}
//# sourceMappingURL=LimitationStrategyFactory.d.ts.map