import { GroupTypeEnum } from "../enum/GroupTypeEnum";
import { TypeEnum } from "../enum/Type";

export type TagsType = [string];

export type GroupType = {
    name: string,
    weight: number,
    type: GroupTypeEnum,
    sequentialIndex: number | null,
    sequentialCount: number | null,
};

export type LimitationStrategyType = {
    max: number,
    tags: TagsType,
    isSeparate: boolean,
    _isTagged: boolean,
};

export type RandomEventType = {
    passageName: string,
    isEnabled: boolean,
    groups: GroupType[],
    filter: string | boolean,
    type: TypeEnum,
    threshold: number | string,
    tags: TagsType,
    limitationStrategies: LimitationStrategyType[],

    // pre-calculated values
    _isLimitationStrategiesTagged: boolean,
    _groupByNameIndex: {[groupName: string]: number},
    _stringTags: string[],

    // run counts
    _runCountHistory: number,
    _runCountActual: number,
    _runCountByTagsHistory: {[tag: string]: number},
    _runCountByTagsActual: {[tag: string]: number},
};
