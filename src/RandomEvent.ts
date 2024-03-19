import Tags from "./Tags";
import GroupList from "./GroupList";
import LimitationStrategyList from "./LimitationStrategyList";

export default class RandomEvent {
    constructor(
        public name: string,
        public isEnabled: boolean,
        public groups: GroupList,
        public filter: null | string,
        public type: string,
        public threshold: number | string,
        public tags: Tags,
        public limitationStrategy: LimitationStrategyList
    ) {
    }

    static createFromDefinition(definition: any): RandomEvent { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (typeof definition.name !== 'string') {
            throw new Error(`"definition.name" should be string`);
        }

        if (definition.isEnabled === undefined) {
            definition.isEnabled = true;
        } else {
            if (typeof definition.isEnabled !== 'boolean') {
                throw new Error(`"definition.isEnabled" should be boolean (name: ${definition.name})`);
            }
        }

        try {
            // TODO rename definition.group to definition.groups
            definition.groups = GroupList.createFromGroupsDefinition(definition.group);
        } catch (e) {
            e.message = `${e.message} (name: ${definition.name})`;
            throw e;
        }

        if (definition.filter === undefined) {
            definition.filter = null;
        } else {
            if (definition.filter !== null && typeof definition.filter !== 'string') {
                throw new Error(`"definition.filter" should be string or null (name: ${definition.name})`);
            }
        }

        if (definition.type === undefined) {
            definition.type = 'embaded';
        } else {
            if (definition.type !== 'embaded' && definition.type !== 'goto') {
                throw new Error(`"definition.type" should be "embaded" or "goto" (name: ${definition.name})`);
            }
        }

        if (definition.threshold === undefined) {
            definition.threshold = 100;
        } else {
            if (typeof definition.threshold === 'number') {
                if (definition.threshold < 0) {
                    throw new Error(`"definition.threshold" should be >= than 0 (name: ${definition.name})`);
                }
                if (definition.threshold > 100) {
                    throw new Error(`"definition.threshold" should be <= than 100 (name: ${definition.name})`);
                }
            }
        }

        try {
            definition.tags = Tags.createFromTagsDefinition(definition.tags);
        } catch (e) {
            e.message = `${e.message} (name: ${definition.name})`;
            throw e;
        }

        try {
            definition.limitationStrategy = LimitationStrategyList.createFromLimitationStrategiesDefinition(definition.limitationStrategy);
        } catch (e) {
            e.message = `${e.message} (name: ${definition.name})`;
            throw e;
        }

        return new this(
            definition.name,
            definition.isEnabled,
            definition.groups,
            definition.filter,
            definition.type,
            definition.threshold,
            definition.tags,
            definition.limitationStrategy
        );
    }
}
