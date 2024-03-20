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
