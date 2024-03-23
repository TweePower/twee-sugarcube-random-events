import GroupList from "./GroupList";
import LimitationStrategyList from "./model/LimitationStrategyList";
import {default as BasePassageMetadata} from "./PassageMetadata/model/PassageMetadata";
import Tags from "./Tags";

export default class PassageMetadata extends BasePassageMetadata {
    constructor(
        name: string,
        metadata: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
        public isEnabled: boolean,
        public groups: GroupList,
        public filter: null | string,
        public type: string,
        public threshold: number | string,
        public tags: Tags,
        public limitationStrategy: LimitationStrategyList
    ) {
        super(name, metadata);
    }
}
