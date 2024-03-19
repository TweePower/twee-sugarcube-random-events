import TypeChecker from "./tools/TypeChecker";
import RandomEventCollection from "./RandomEventCollection";
import RandomEventHistory from "./RandomEventHistory";
import RandomEvent from "./RandomEvent";
import RandomEventCollector from "./RandomEventCollector";
import Tags from "./Tags";
import Lock from "./Lock";
import StateLoader from "./StateLoader";
import DebugLogCollector from "./DebugLogCollector";
import ConstraintsVerificator from "./ConstraintsVerificator";
import { LimitationStrategyVariableType } from "./type/Variables";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import { GroupType } from "./enum/GroupType";
import Group from "./Group";

declare let Story: {
    has(passageName: string): boolean;
};

declare type RunRandomEventResultType = {
    isSuccess: boolean,
    debugLogCollector?: DebugLogCollector,
    randomEvent?: RandomEvent,
    usedTags?: [string[]?],
    group?: Group,
};

export default class RandomEventApp {
    randomEventCollection: RandomEventCollection;
    randomEventHistory: RandomEventHistory;
    randomEventCollector: RandomEventCollector;
    stateLoader: StateLoader;
    lock: Lock;
    debugLogCollector: DebugLogCollector;
    constraintsVerificator: ConstraintsVerificator;

    constructor(
        private randomEventTag: string = 'random_event',
        randomEventDefinitionRegex: RegExp = /<<RandomEventDefinition>>(.*)<<\/RandomEventDefinition>>/gms,
        debugLevel: number = 0,
    ) {
        this.randomEventCollection = new RandomEventCollection();
        this.randomEventHistory = new RandomEventHistory();
        this.randomEventCollector = new RandomEventCollector(this.randomEventCollection, randomEventTag, randomEventDefinitionRegex);
        this.stateLoader = new StateLoader(this.randomEventCollection, this.randomEventHistory);
        this.lock = new Lock();
        this.debugLogCollector = new DebugLogCollector(debugLevel);
        this.constraintsVerificator = new ConstraintsVerificator(this.randomEventHistory);
    }

    init() {
        this.randomEventCollector.init();
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

    has = (passageName: string) => this.randomEventCollection.has(passageName);
    find = (passageName: string) => this.randomEventCollection.find(passageName);
    enable(passageName: string) {
        if (!this.randomEventCollection.has(passageName)) {
            if (!Story.has(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.randomEventTag}"`);
        }

        this.randomEventCollection.enable(passageName);
        this.randomEventHistory.enable(passageName);
    }
    disable(passageName: string) {
        if (!this.randomEventCollection.has(passageName)) {
            if (!Story.has(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.randomEventTag}"`);
        }

        this.randomEventCollection.disable(passageName);
        this.randomEventHistory.disable(passageName);
    }
    enableByTag(tag: string) {
        tag = tag.toLowerCase();

        this.randomEventCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.randomEventCollection.enable(passageName);
            this.randomEventHistory.enable(passageName, false);
        });
        this.randomEventHistory.store();
    }
    disableByTag(tag: string) {
        tag = tag.toLowerCase();

        this.randomEventCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.randomEventCollection.disable(passageName);
            this.randomEventHistory.disable(passageName, false);
        });
        this.randomEventHistory.store();
    }
    resetFiredCounterByRandomEvent(passageName: string) {
        if (!this.randomEventCollection.has(passageName)) {
            if (!Story.has(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.randomEventTag}"`);
        }

        this.randomEventHistory.resetRandomEventFiredCounter(passageName);
    }
    resetFiredCounterByTag(tag: string) {
        tag = tag.toLowerCase();

        this.randomEventHistory.resetTagFiredCounter(tag, false);

        this.randomEventCollection.getEventsNamesByTag(tag).forEach((passageName) => {
            this.randomEventHistory.resetRandomEventFiredCounter(passageName, false);
        });

        this.randomEventCollection.getEventsNamesByLimitationStrategyTag(tag).forEach((passageName) => {
            this.randomEventHistory.resetRandomEventFiredCounter(passageName, false);
        });

        this.randomEventCollection.getTagGroupsByLimitationStrategyTag(tag).forEach((tags) => {
            const tagsStringKey = (new Tags(tags)).toStringKey();
            this.randomEventHistory.resetTagFiredCounter(tagsStringKey, false);
        });

        this.randomEventHistory.store();
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

        if (!this.randomEventCollection.has(passageName)) {
            if (!Story.has(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.randomEventTag}"`);
        }

        const randomEvent = this.randomEventCollection.get(passageName);
        this.debugLogCollector.addLog(null, `Start random event ${randomEvent.name}`, 1);
        this.debugLogCollector.increaseLevel();

        let result = true;

        if (this.lock.isLocked) {
            result = false;
            this.debugLogCollector.addLog(null, `Skip because lock already acquired`, 1);

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
                randomEvent,
                usedTags: []
            };
        }

        try {
            const compiledTags = randomEvent.tags.getCompiledTags();
            const checkResult = this.constraintsVerificator.verify(randomEvent, rewriteConfiguration);
            result = checkResult.result;
            this.debugLogCollector
                .increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
                randomEvent,
                usedTags: randomEvent.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags]
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

        if (!this.randomEventCollection.hasGroup(groupName)) {
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
                    .addLog(
                        checkResult.result,
                        'verify group threshold',
                        2
                    )
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

        let totalWeight = 0;
        const sucessRandomEventsResults: [RunRandomEventResultType?] = [];
        const passageNames = this.randomEventCollection.getEventsNamesByGroup(groupName);
        for (let groupIndex = 0; groupIndex < passageNames.length; groupIndex++) {
            const passageName = passageNames[groupIndex];
            if (!this.randomEventCollection.has(passageName)) {
                if (!Story.has(passageName)) {
                    throw new Error(`passage "${passageName}" does not exist`);
                }

                throw new Error(`passage "${passageName}" exist but without tag "${this.randomEventTag}"`);
            }

            const randomEvent = this.randomEventCollection.get(passageName);
            const group = randomEvent.groups.getByName(groupName);
            if (group === null) {
                throw new Error(`Can't find group "${groupName}" in random event ${randomEvent.name}`);
            }
            this.debugLogCollector.addLog(null, `verify random event ${randomEvent.name} with weight ${group.weight}`, 1);
            this.debugLogCollector.increaseLevel();

            try {
                const compiledTags = randomEvent.tags.getCompiledTags();
                const checkResult = this.constraintsVerificator.verify(randomEvent, rewriteConfiguration);
                const result = checkResult.result;
                this.debugLogCollector
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();

                if (result) {
                    totalWeight += group.weight;
                    sucessRandomEventsResults.push({
                        isSuccess: result,
                        randomEvent: randomEvent,
                        usedTags: randomEvent.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags],
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
        if (sucessRandomEventsResults[0].group.type === GroupType.Sequential) {
            const sucessRandomEventsSequentialResults = sucessRandomEventsResults.filter((sucessRandomEventsResult) => {
                return this.randomEventHistory.getHistoryFiredEventCount(sucessRandomEventsResult.randomEvent.name) < sucessRandomEventsResult.group.sequentialCount;
            });
            this.debugLogCollector.addLog(true, `sequential search found ${sucessRandomEventsSequentialResults.length} siutable events`, 3);

            if (sucessRandomEventsSequentialResults.length > 0) {
                winnerRandomEventResult = sucessRandomEventsSequentialResults.sort((a: RunRandomEventResultType, b: RunRandomEventResultType): number => {
                    return a.group.sequentialIndex - b.group.sequentialIndex;
                })[0];
                this.debugLogCollector.addLog(true, `winner random event: ${winnerRandomEventResult.randomEvent.name}`, 3);

                return {
                    isSuccess: result,
                    debugLogCollector: this.debugLogCollector,
                    randomEvent: winnerRandomEventResult.randomEvent,
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
        this.debugLogCollector.addLog(true, `winner random event: ${winnerRandomEventResult.randomEvent.name}`, 3);

        return {
            isSuccess: result,
            debugLogCollector: this.debugLogCollector,
            randomEvent: winnerRandomEventResult.randomEvent,
            usedTags: winnerRandomEventResult.usedTags,
            group: winnerRandomEventResult.group,
        };
    }

    incrementCounters(randomEvent: RandomEvent, usedTags?: [string[]?]) {
        this.randomEventHistory.incrementRandomEventFiredCounter(randomEvent.name, false);
        usedTags.forEach(tags => {
            this.randomEventHistory.incrementTagsFiredCounter([...tags, new Tags(tags).toStringKey()], false)
        })
        this.randomEventHistory.store();
        this.stateLoader.forceSetIsLoadedFlag(true);
    }
}
