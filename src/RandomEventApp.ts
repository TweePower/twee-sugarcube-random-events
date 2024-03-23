import TypeChecker from "./tools/TypeChecker";
import History from "./History";
import PassageMetadata from "./PassageMetadata";
import Lock from "./Lock";
import StateLoader from "./StateLoader";
import DebugLogCollector from "./DebugLogCollector";
import ConstraintsVerificator from "./ConstraintsVerificator";
import { LimitationStrategyVariableType } from "./type/Variables";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import { GroupTypeEnum } from "./enum/GroupTypeEnum";
import Group from "./Group";
import PassageMetadataApp from "./PassageMetadataApp";
import PassageMetadataCollection from "./PassageMetadataCollection";
import SugarcubeFacade from "./facade/SugarcubeFacade";
import TagsManager from "./TagsManager";
import LimitationStrategyFactory from "./factory/LimitationStrategyFactory";

declare type RunRandomEventResultType = {
    isSuccess: boolean,
    debugLogCollector?: DebugLogCollector,
    passageMetadata?: PassageMetadata,
    usedTags?: [string[]?],
    group?: Group,
};

export default class RandomEventApp {
    passageMetadataApp: PassageMetadataApp;
    history: History;
    stateLoader: StateLoader;
    lock: Lock;
    debugLogCollector: DebugLogCollector;
    constraintsVerificator: ConstraintsVerificator;
    passageMetadataCollection: PassageMetadataCollection;
    sugarcubeFacade: SugarcubeFacade;
    tagsManager: TagsManager;
    limitationStrategyFactory: LimitationStrategyFactory;

    constructor(
        passageMetadataRegex: RegExp = /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        passageMetadataMode: string = 'byTag',// all
        public passageMetadataModeParams: { filterTag?: string } = { filterTag: 'passage_metadata' },
        debugLevel: number = 0,
    ) {
        this.sugarcubeFacade = new SugarcubeFacade();
        this.tagsManager = new TagsManager(this.sugarcubeFacade);
        this.limitationStrategyFactory = new LimitationStrategyFactory(this.tagsManager);
        this.passageMetadataApp = new PassageMetadataApp(
            this.tagsManager,
            this.limitationStrategyFactory,
            this.sugarcubeFacade,
            passageMetadataRegex,
            passageMetadataMode,
            passageMetadataModeParams,
        );
        this.passageMetadataApp.init();
        this.passageMetadataCollection = this.passageMetadataApp.passageMetadataCollection;
        this.history = new History(this.sugarcubeFacade);
        this.stateLoader = new StateLoader(this.passageMetadataApp.passageMetadataCollection, this.history);
        this.lock = new Lock();
        this.debugLogCollector = new DebugLogCollector(debugLevel);
        this.constraintsVerificator = new ConstraintsVerificator(this.sugarcubeFacade, this.tagsManager, this.history);
    }

    init() {
        this.passageMetadataApp.collect();
    }

    get isLocked(): boolean {
        return this.lock.isLocked;
    };
    get isForceLocked(): boolean {
        return this.lock.isForce;
    };
    acquireLock = () => this.lock.acquire();
    releaseLock = () => this.lock.release();
    forceAcquireLock = () => this.lock.forceAcquire();
    forceReleaseLock = () => this.lock.forceRelease();

    loadState = (variables: LimitationStrategyVariableType) => this.stateLoader.loadState(variables);
    setStateAsLoaded = () => this.stateLoader.forceSetIsLoadedFlag(true);
    resetStateLoadedFlag = () => this.stateLoader.resetIsLoadedFlag();

    has = (passageName: string) => this.passageMetadataCollection.has(passageName);
    find = (passageName: string) => this.passageMetadataCollection.find(passageName);
    enable(passageName: string) {
        if (!this.passageMetadataCollection.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataModeParams.filterTag}"`);
        }

        this.passageMetadataCollection.enable(passageName);
        this.history.enable(passageName);
    }
    disable(passageName: string) {
        if (!this.passageMetadataCollection.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataModeParams.filterTag}"`);
        }

        this.passageMetadataCollection.disable(passageName);
        this.history.disable(passageName);
    }
    enableByTag(tag: string) {
        tag = tag.toLowerCase();

        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.passageMetadataCollection.enable(passageName);
            this.history.enable(passageName, false);
        });
        this.history.store();
    }
    disableByTag(tag: string) {
        tag = tag.toLowerCase();

        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.passageMetadataCollection.disable(passageName);
            this.history.disable(passageName, false);
        });
        this.history.store();
    }
    resetFiredCounterByRandomEvent(passageName: string) {
        if (!this.passageMetadataCollection.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataModeParams.filterTag}"`);
        }

        this.history.resetRandomEventFiredCounter(passageName);
    }
    resetFiredCounterByTag(tag: string) {
        tag = tag.toLowerCase();

        this.history.resetTagFiredCounter(tag, false);

        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.history.resetRandomEventFiredCounter(passageName, false);
        });

        this.passageMetadataCollection.getEventsNamesByLimitationStrategyTag(tag).forEach((passageName) => {
            this.history.resetRandomEventFiredCounter(passageName, false);
        });

        this.passageMetadataCollection.getTagGroupsByLimitationStrategyTag(tag).forEach((tags) => {
            const tagsStringKey = this.tagsManager.convertTagsToStringKey(tags);
            this.history.resetTagFiredCounter(tagsStringKey, false);
        });

        this.history.store();
    }

    runRandomEvent(passageName: string, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType {
        this.debugLogCollector.clear();

        rewriteConfiguration = {
            ...{
                isValidateIsEnable: true,
                isEnable: null,
                isValidateFilter: true,
                filter: null,
                isValidateLimitationStrategy: true,
                limitationStrategy: null,
                isValidateThreshold: true,
                threshold: null,
            },
            ...(rewriteConfiguration ?? {})
        }

        if (!this.passageMetadataCollection.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataModeParams.filterTag}"`);
        }

        const passageMetadata = this.passageMetadataCollection.get(passageName);
        this.debugLogCollector.addLog(null, `Start random event ${passageMetadata.name}`, 1);
        this.debugLogCollector.increaseLevel();

        let result = true;

        if (this.lock.isLocked) {
            result = false;
            this.debugLogCollector.addLog(null, `Skip because lock already acquired`, 1);

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
                passageMetadata,
                usedTags: []
            };
        }

        try {
            const compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);
            const checkResult = this.constraintsVerificator.verify(passageMetadata, rewriteConfiguration);
            result = checkResult.result;
            this.debugLogCollector
                .addLog(null, `Verify:`, 2)
                .increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
                passageMetadata,
                usedTags: passageMetadata.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags]
            };
        } catch (err) {
            // TODO add data to error
            throw err;
        }
    }

    runGroup(groupName: string, groupThreshold?: number, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType {
        groupName = groupName.toLowerCase();
        this.debugLogCollector.clear();

        rewriteConfiguration = {
            ...{
                isValidateIsEnable: true,
                isEnable: null,
                isValidateFilter: true,
                filter: null,
                isValidateLimitationStrategy: true,
                limitationStrategy: null,
                isValidateThreshold: true,
                threshold: null,
            },
            ...(rewriteConfiguration ?? {})
        }

        if (!this.passageMetadataCollection.hasGroup(groupName)) {
            throw new Error(`group "${groupName}" does not exist`);
        }
        this.debugLogCollector.addLog(null, `Start group ${groupName}`, 1);
        this.debugLogCollector.increaseLevel();

        let result = true;

        if (this.lock.isLocked) {
            result = false;
            this.debugLogCollector.addLog(null, `Skip because lock already acquired`, 1);

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
            };
        }

        if (TypeChecker.isNumber(groupThreshold) || TypeChecker.isString(groupThreshold)) {
            try {
                const checkResult = this.constraintsVerificator.verifyThreshold(groupThreshold);
                result = checkResult.result;
                this.debugLogCollector
                    .addLog(null, 'Verify group threshold', 2)
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            } catch (err) {
                // TODO add data to error
                throw err;
            }

            if (result === false) {
                return {
                    isSuccess: result,
                    debugLogCollector: this.debugLogCollector,
                };
            }

            rewriteConfiguration.isValidateThreshold = false;
        }

        this.debugLogCollector
            .increaseLevel()
            .addLog(null, 'Verify random events in group', 1)
            .increaseLevel();

        let totalWeight = 0;
        const sucessRandomEventsResults: [RunRandomEventResultType?] = [];
        const passageNames = this.passageMetadataCollection.getEventsNamesByGroup(groupName);
        for (let groupIndex = 0; groupIndex < passageNames.length; groupIndex++) {
            const passageName = passageNames[groupIndex];
            if (!this.passageMetadataCollection.has(passageName)) {
                if (!this.sugarcubeFacade.hasPassage(passageName)) {
                    throw new Error(`passage "${passageName}" does not exist`);
                }

                throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataModeParams.filterTag}"`);
            }

            const passageMetadata = this.passageMetadataCollection.get(passageName);
            const group = passageMetadata.groups.getByName(groupName);
            if (group === null) {
                throw new Error(`Can't find group "${groupName}" in random event ${passageMetadata.name}`);
            }
            this.debugLogCollector
                .addLog(null, `Random event ${passageMetadata.name} with weight ${group.weight}`, 1)
                .increaseLevel()

            try {
                const compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);
                const checkResult = this.constraintsVerificator.verify(passageMetadata, rewriteConfiguration);
                const result = checkResult.result;
                this.debugLogCollector
                    .addLog(null, `Verify`, 2)
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();

                if (result) {
                    totalWeight += group.weight;
                    sucessRandomEventsResults.push({
                        isSuccess: result,
                        passageMetadata: passageMetadata,
                        usedTags: passageMetadata.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags],
                        group: group,
                    });
                }
            } catch (err) {
                // TODO add data to error
                throw err;
            }
            this.debugLogCollector.decreaseLevel();
        }

        if (sucessRandomEventsResults.length <= 0) {
            result = false;
            this.debugLogCollector.addLog(false, `not found any suitable random events in group`, 2);

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
            };
        }

        let winnerRandomEventResult: RunRandomEventResultType | null = null;
        if (sucessRandomEventsResults[0].group.type === GroupTypeEnum.Sequential) {
            this.debugLogCollector
                .addLog(true, `Find winner event`, 2)
                .increaseLevel();
            const sucessRandomEventsSequentialResults = sucessRandomEventsResults.filter((sucessRandomEventsResult) => {
                return this.history.getHistoryFiredEventCount(sucessRandomEventsResult.passageMetadata.name) < sucessRandomEventsResult.group.sequentialCount;
            });
            this.debugLogCollector.addLog(true, `sequential search found ${sucessRandomEventsSequentialResults.length} siutable events`, 3);

            if (sucessRandomEventsSequentialResults.length > 0) {
                winnerRandomEventResult = sucessRandomEventsSequentialResults.sort((a: RunRandomEventResultType, b: RunRandomEventResultType): number => {
                    return a.group.sequentialIndex - b.group.sequentialIndex;
                })[0];
                this.debugLogCollector.addLog(true, `winner random event: ${winnerRandomEventResult.passageMetadata.name}`, 3);

                return {
                    isSuccess: result,
                    debugLogCollector: this.debugLogCollector,
                    passageMetadata: winnerRandomEventResult.passageMetadata,
                    usedTags: winnerRandomEventResult.usedTags,
                    group: winnerRandomEventResult.group,
                };
            }
        }

        let winnerWeight = Math.floor(Math.random() * totalWeight);
        this.debugLogCollector.addLog(true, `total weight: ${totalWeight} | wittner weight: ${winnerWeight}`, 3);

        for (let i = 0; i < sucessRandomEventsResults.length; i++) {
            winnerWeight -= sucessRandomEventsResults[i].group.weight;

            if (winnerWeight <= 0) {
                winnerRandomEventResult = sucessRandomEventsResults[i];
                break;
            }
        }
        this.debugLogCollector.addLog(true, `winner random event: ${winnerRandomEventResult.passageMetadata.name}`, 3);

        return {
            isSuccess: result,
            debugLogCollector: this.debugLogCollector,
            passageMetadata: winnerRandomEventResult.passageMetadata,
            usedTags: winnerRandomEventResult.usedTags,
            group: winnerRandomEventResult.group,
        };
    }

    incrementCounters(passageMetadata: PassageMetadata, usedTags?: [string[]?]) {
        this.history.incrementRandomEventFiredCounter(passageMetadata.name, false);
        usedTags.forEach(tags => {
            this.history.incrementTagsFiredCounter([...tags, this.tagsManager.convertTagsToStringKey(tags)], false)
        })
        this.history.store();
        this.stateLoader.forceSetIsLoadedFlag(true);
    }
}
