import LimitationStrategyList from "../LimitationStrategyList";

export type RewriteConfigurationType = {
    isValidateIsEnable?: boolean,
    isEnable?: boolean | null | undefined,
    isValidateThreshold?: boolean,
    threshold?: number | string | null | undefined,
    isValidateFilter?: boolean,
    filter?: string | null | undefined,
    isValidateLimitationStrategy?: boolean,
    limitationStrategy?: LimitationStrategyList | null | undefined,
};
