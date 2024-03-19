export type GroupDefinitionType = {
    name: string,
    weight: number | null,
    type: string | null,
    sequentialIndex: number | null,
    sequentialCount: number | null,
};

export type LimitationStrategyType = {
    max: number,
    tags: [string] | null,
    isSeparate: boolean,
};

export type RandomEventDefinitionType = {
    name: string,
    isEnabled: boolean | undefined,
    type: string | undefined,
    threshold: number | undefined,
    filter: string | undefined,
    tags: string[] | undefined,
    group: GroupDefinitionType[] | GroupDefinitionType | undefined,
    limitationStrategy: LimitationStrategyType[],
};
