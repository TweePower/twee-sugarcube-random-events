import TagsManager from "../TagsManager";
import { LimitationStrategyPassageMetadataType } from "../type/PassageMetadata";
import LimitationStrategyList from "../model/LimitationStrategyList";
import LimitationStrategyFactory from "./LimitationStrategyFactory";
export default class LimitationStrategyListFactory {
    private tagsManager;
    private limitationStrategyFactory;
    constructor(tagsManager: TagsManager, limitationStrategyFactory: LimitationStrategyFactory);
    createFromPassageMetadataObject(limitationStrategyListMetadata?: LimitationStrategyPassageMetadataType[] | any): LimitationStrategyList;
}
//# sourceMappingURL=LimitationStrategyListFactory.d.ts.map