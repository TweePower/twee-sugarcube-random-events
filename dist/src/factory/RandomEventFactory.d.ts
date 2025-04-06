import RandomEvent from "../model/RandomEvent";
import GroupListFactory from "./GroupListFactory";
import TagListFactory from "./TagListFactory";
import LimitationStrategyListFactory from "./LimitationStrategyListFactory";
export default class RandomEventFactory {
    private groupListFactory;
    private tagListFactory;
    private limitationStrategyListFactory;
    constructor(groupListFactory: GroupListFactory, tagListFactory: TagListFactory, limitationStrategyListFactory: LimitationStrategyListFactory);
    createFromPassageMetadataObject(passageMetadataObject: {
        [key: string | number]: any;
    }): RandomEvent;
}
//# sourceMappingURL=RandomEventFactory.d.ts.map