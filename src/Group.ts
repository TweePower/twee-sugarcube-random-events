import TypeChecker from "./tools/TypeChecker";
import { GroupTypeEnum } from "./enum/GroupTypeEnum";
import { GroupDefinitionType } from "./type/Definition";

export default class Group {
    constructor(
        public name: string,
        public weight: number,
        public type: GroupTypeEnum,
        public sequentialIndex: number | null,
        public sequentialCount: number | null,
    ) {
    }

    static createFromGroupDefinition(
        groupDefinition: string | GroupDefinitionType | any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): Group {
        if (typeof groupDefinition === 'string') {
            return new Group(
                groupDefinition.toLowerCase(),
                10,
                GroupTypeEnum.Random,
                null,
                null
            );
        } else {
            if (TypeChecker.isObject(groupDefinition)) {
                if (!TypeChecker.isString(groupDefinition.name)) {
                    throw new Error(`"definition.group.name" should be string`);
                }

                if (groupDefinition.weight !== undefined && !TypeChecker.isInteger(groupDefinition.weight)) {
                    throw new Error(`"definition.group.weight" should be integer`);
                }

                if (groupDefinition.type !== undefined && groupDefinition.type !== 'random' && groupDefinition.type !== 'sequential') {
                    throw new Error(`"definition.group.type" should be "random" or "sequential"`);
                }

                if (groupDefinition.type === 'sequential') {
                    if (groupDefinition.sequentialIndex === undefined) {
                        throw new Error(`"definition.group.sequentialIndex" is requered when "definition.group.type" = "sequential"`);
                    }
                    if (!TypeChecker.isInteger(groupDefinition.sequentialIndex)) {
                        throw new Error(`"definition.group.sequentialIndex" should be integer`);
                    }
                    if (groupDefinition.sequentialCount !== undefined && !TypeChecker.isInteger(groupDefinition.sequentialCount)) {
                        throw new Error(`"definition.group.sequentialCount" should be integer`);
                    }
                }

                return new Group(
                    groupDefinition.name.toLowerCase(),
                    groupDefinition.weight ?? 10,
                    groupDefinition.type === 'sequential' ? GroupTypeEnum.Sequential : GroupTypeEnum.Random,
                    groupDefinition.type === 'sequential' ? groupDefinition.sequentialIndex : null,
                    groupDefinition.type === 'sequential' ? (groupDefinition.sequentialCount ?? 1) : null,
                )
            } else {
                throw new Error(`"definition.group" should be string, object`);
            }
        }
    }
}
