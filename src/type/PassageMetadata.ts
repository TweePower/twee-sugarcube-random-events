export type GroupPassageMetadataType = {
    name: string,
    weight: number | null,
    type: string | null,
    sequentialIndex: number | null,
    sequentialCount: number | null,
};

export type LimitationStrategyPassageMetadataType = {
    max: number,
    tags: [string] | null,
    isSeparate: boolean,
};
