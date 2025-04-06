import DebugLogCollector from "./DebugLogCollector";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import TagsManager from "./TagsManager";
import { LimitationStrategyType, RandomEventType } from "./type/PassageMetadata";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import RandomEventStats from "./RandomEventStats";
type ConstraintsVerificatingResult = {
    result: boolean;
    debugLogCollector: DebugLogCollector;
    additionalData?: {
        [key: string]: any;
    };
};
export default class ConstraintsVerificator {
    private sugarcubeFacade;
    private tagsManager;
    private randomEventStats;
    constructor(sugarcubeFacade: SugarcubeFacade, tagsManager: TagsManager, randomEventStats: RandomEventStats);
    verify(randomEvent: RandomEventType, compiledTags: string[], rewriteConfiguration: RewriteConfigurationType): ConstraintsVerificatingResult;
    verifyIsEnable(isEnabled: boolean): ConstraintsVerificatingResult;
    verifyFilter(filter: string | boolean): ConstraintsVerificatingResult;
    verifyTaggedLimitationStrategy(passageName: string, limitationStrategies: LimitationStrategyType[], compiledTags: string[]): ConstraintsVerificatingResult;
    verifyNotTaggedLimitationStrategy(passageName: string, limitationStrategies: LimitationStrategyType[], compiledTags: string[]): ConstraintsVerificatingResult;
    verifyThreshold(threshold: number | string): ConstraintsVerificatingResult;
}
export {};
//# sourceMappingURL=ConstraintsVerificator.d.ts.map