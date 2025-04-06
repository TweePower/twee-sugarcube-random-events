import { LimitationStrategyType } from "./PassageMetadata";

export type RewriteConfigurationType = {
    isValidateIsEnable?: boolean,
    isEnabled?: boolean | null | undefined,
    isValidateThreshold?: boolean,
    threshold?: number | string | null | undefined,
    isValidateFilter?: boolean,
    filter?: string | null | undefined,
    // TODO: need to rethink how to validate it separate
    // isValidateLimitationStrategies?: boolean,
    // limitationStrategies?: LimitationStrategyType[] | null | undefined,
};
