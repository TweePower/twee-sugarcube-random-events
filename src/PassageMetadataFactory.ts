import GroupList from "./GroupList";
import LimitationStrategyList from "./LimitationStrategyList";
import PassageMetadata from "./PassageMetadata";
import {default as BasePassageMetadataFactory} from "./PassageMetadata/PassageMetadataFactory";
import Tags from "./Tags";

export default class PassageMetadataFactory extends BasePassageMetadataFactory {
    public create(passageMetadataObject: { [key: string]: any }): PassageMetadata {
        if (typeof passageMetadataObject.name !== 'string') {
            throw new Error(`"PassageMetadata.name" should be string`);
        }

        if (passageMetadataObject.isEnabled === undefined) {
            passageMetadataObject.isEnabled = true;
        } else {
            if (typeof passageMetadataObject.isEnabled !== 'boolean') {
                throw new Error(`"definition.isEnabled" should be boolean (name: ${passageMetadataObject.name})`);
            }
        }

        try {
            passageMetadataObject.groups = GroupList.createFromGroupsDefinition(passageMetadataObject.groups);
        } catch (e) {
            e.message = `${e.message} (name: ${passageMetadataObject.name})`;
            throw e;
        }

        if (passageMetadataObject.filter === undefined) {
            passageMetadataObject.filter = null;
        } else {
            if (passageMetadataObject.filter !== null && typeof passageMetadataObject.filter !== 'string') {
                throw new Error(`"definition.filter" should be string or null (name: ${passageMetadataObject.name})`);
            }
        }

        if (passageMetadataObject.type === undefined) {
            passageMetadataObject.type = 'embedded';
        } else {
            if (passageMetadataObject.type !== 'embedded' && passageMetadataObject.type !== 'goto') {
                throw new Error(`"definition.type" should be "embedded" or "goto" (name: ${passageMetadataObject.name})`);
            }
        }

        if (passageMetadataObject.threshold === undefined) {
            passageMetadataObject.threshold = 100;
        } else {
            if (typeof passageMetadataObject.threshold === 'number') {
                if (passageMetadataObject.threshold < 0) {
                    throw new Error(`"definition.threshold" should be >= than 0 (name: ${passageMetadataObject.name})`);
                }
                if (passageMetadataObject.threshold > 100) {
                    throw new Error(`"definition.threshold" should be <= than 100 (name: ${passageMetadataObject.name})`);
                }
            }
        }

        try {
            passageMetadataObject.tags = Tags.createFromTagsDefinition(passageMetadataObject.tags);
        } catch (e) {
            e.message = `${e.message} (name: ${passageMetadataObject.name})`;
            throw e;
        }

        try {
            passageMetadataObject.limitationStrategy = LimitationStrategyList.createFromLimitationStrategiesDefinition(passageMetadataObject.limitationStrategy);
        } catch (e) {
            e.message = `${e.message} (name: ${passageMetadataObject.name})`;
            throw e;
        }

        return new PassageMetadata(
            passageMetadataObject.name,
            passageMetadataObject,
            passageMetadataObject.isEnabled,
            passageMetadataObject.groups,
            passageMetadataObject.filter,
            passageMetadataObject.type,
            passageMetadataObject.threshold,
            passageMetadataObject.tags,
            passageMetadataObject.limitationStrategy,
        );
    }
}
