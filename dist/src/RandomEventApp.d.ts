import Lock from "./Lock";
import DebugLogCollector from "./DebugLogCollector";
import ConstraintsVerificator from "./ConstraintsVerificator";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import TagsManager from "./TagsManager";
import PassageMetadata from "twee-sugarcube-passage-metadata-collector/src/PassageMetadata";
import PassageMetadataApp from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataApp";
import { GroupType, RandomEventType } from "./type/PassageMetadata";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import RandomEventStats from "./RandomEventStats";
declare type RunRandomEventResultType = {
    isSuccess: boolean;
    debugLogCollector?: DebugLogCollector;
    passageMetadata?: RandomEventType;
    usedTags?: [string[]?];
    group?: GroupType;
};
export default class RandomEventApp {
    private passageMetadataApp;
    lock: Lock;
    debugLogCollector: DebugLogCollector;
    constraintsVerificator: ConstraintsVerificator;
    sugarcubeFacade: SugarcubeFacade;
    tagsManager: TagsManager;
    randomEventStats: RandomEventStats;
    private _passagesByTagIndex;
    private _passagesByGroupIndex;
    constructor(passageMetadataApp: PassageMetadataApp, debugLevel?: number);
    get isLocked(): boolean;
    get isForceLocked(): boolean;
    acquireLock: () => void;
    releaseLock: () => void;
    forceAcquireLock: () => void;
    forceReleaseLock: () => void;
    has: (passageName: string) => boolean;
    find: (passageName: string) => PassageMetadata;
    enable(passageName: string): void;
    disable(passageName: string): void;
    enableByTag(tag: string): void;
    disableByTag(tag: string): void;
    runRandomEvent(passageName: string, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType;
    runGroup(groupName: string, groupThreshold?: number, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType;
    incrementRunCounters(passageName: string, usedTags?: [string[]?]): void;
    resetRunCounterByPassage(passageName: string): void;
    resetRunCounterByTag(tag: string): void;
}
export {};
//# sourceMappingURL=RandomEventApp.d.ts.map