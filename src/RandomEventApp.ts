import Lock from "./Lock";
import DebugLogCollector from "./DebugLogCollector";
import ConstraintsVerificator from "./ConstraintsVerificator";
import { RewriteConfigurationType } from "./type/RewriteConfiguration";
import { GroupTypeEnum } from "./enum/GroupTypeEnum";
import TagsManager from "./TagsManager";

import PassageMetadata from "twee-sugarcube-passage-metadata-collector/src/PassageMetadata"
import PassageMetadataApp from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataApp"
import { PassageMetadataStateType } from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataStateManager";
import PassageMetadataValidationError from "./error/PassageMetadataValidationError";
import RandomEventPassageMetadataProcessor from "./processors/RandomEventPassageMetadataProcessor";
import { GroupType, RandomEventType } from "./type/PassageMetadata";
import { isArray, isNumber, isString, isTweeScript } from "./tools/TypeChecker";
import { default as initializeMacros } from "./macros/index"
import SugarcubeFacade from "./facade/SugarcubeFacade";
import RandomEventStats from "./RandomEventStats";

declare type RunRandomEventResultType = {
    isSuccess: boolean,
    debugLogCollector?: DebugLogCollector,
    group?: GroupType,
    resultList?: [
        {
            passageMetadata?: RandomEventType,
            usedTags?: [string[]?],
        }?
    ],
};

declare type SingleRandomEventResultType = {
    isSuccess: boolean,
    debugLogCollector?: DebugLogCollector,
    group?: GroupType,
    passageMetadata?: RandomEventType,
    usedTags?: [string[]?],
};

export default class RandomEventApp {
    lock: Lock;
    debugLogCollector: DebugLogCollector;
    constraintsVerificator: ConstraintsVerificator;
    sugarcubeFacade: SugarcubeFacade;
    tagsManager: TagsManager;
    randomEventStats: RandomEventStats;

    private _passagesByTagIndex: {[tag: string]: string[]} = {};
    private _passagesByGroupIndex: {[tag: string]: string[]} = {};

    constructor(
        private passageMetadataApp: PassageMetadataApp,
        debugLevel: number = 0,
    ) {
        this.sugarcubeFacade = new SugarcubeFacade();
        this.tagsManager = new TagsManager(this.sugarcubeFacade);
        this.lock = new Lock();
        this.debugLogCollector = new DebugLogCollector(debugLevel);
        this.randomEventStats = new RandomEventStats(passageMetadataApp, this.tagsManager);
        this.constraintsVerificator = new ConstraintsVerificator(this.sugarcubeFacade, this.tagsManager, this.randomEventStats);

        const randomEventPassageMetadataProcessor = new RandomEventPassageMetadataProcessor();

        passageMetadataApp.onBeforeAddMetadata.add((passageMetadataObject: {[key: string | number]: any}) => {
            try {
                randomEventPassageMetadataProcessor.process(passageMetadataObject);
            } catch (error) {
                if (error instanceof PassageMetadataValidationError) {
                    let message = error.message;
                    if (error.path.length > 0) {
                        message += ' ';
                        error.path.forEach((path: string, index: number) => {
                            if (index === 0 || path[0] === '[') {
                                message += path;
                            } else {
                                message += '.' + path;
                            }
                        });
                    }

                    let scopeMessage: string[] = [];
                    if (error.expected !== null) {
                        scopeMessage.push('expected ' + error.expected);
                    }
                    if (error.actual !== null) {
                        scopeMessage.push('actual ' + error.actual);
                    }

                    throw new Error(`${message}${scopeMessage.join.length > 0 ? ` (${scopeMessage.join(', ')})` : ''}`);
                }

                throw error;
            }
        });

        passageMetadataApp.onAfterAddMetadata.add((passageMetadata: PassageMetadata) => {
            const data: RandomEventType = passageMetadata.data as RandomEventType;

            if (data.tags.length > 0) {
                data.tags.forEach((tag: string) => {
                    if (isTweeScript(tag)) {
                        return;
                    }

                    if (this._passagesByTagIndex[tag] === undefined) {
                        this._passagesByTagIndex[tag] = [];
                    }

                    this._passagesByTagIndex[tag].push(data.passageName);
                });
            }

            if (data.groups.length > 0) {
                data.groups.forEach((group: GroupType) => {
                    if (this._passagesByGroupIndex[group.name] === undefined) {
                        this._passagesByGroupIndex[group.name] = [];
                    }

                    this._passagesByGroupIndex[group.name].push(data.passageName);
                });
            }
        });

        passageMetadataApp.onBeforeRestore.add((state: PassageMetadataStateType) => {
            const passageNames = Object.keys(state);

            passageNames.forEach((passageName: string) => {
                const data = state[passageName];

                if (data.e !== undefined) {
                    data.isEnabled = data.e;
                    delete data.e;
                }
            });
        });

        passageMetadataApp.onBeforeStore.add((state: PassageMetadataStateType) => {
            const passageNames = Object.keys(state);

            passageNames.forEach((passageName: string) => {
                const data = state[passageName];

                if (data.isEnabled !== undefined) {
                    data.e = data.isEnabled;
                    delete data.isEnabled;
                }
            });
        });

        initializeMacros(this, passageMetadataApp, this.sugarcubeFacade);
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

    has = (passageName: string) => this.passageMetadataApp.has(passageName);

    find = (passageName: string) => this.passageMetadataApp.find(passageName);

    enable(passageName: string) {
        if (!this.passageMetadataApp.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            if (this.passageMetadataApp.mode === 'byTag') {
                throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataApp.modeParams.filterTag}"`);
            } else {
                throw new Error(`passage "${passageName}" does'n contain metadata`);
            }
        }

        this.passageMetadataApp.get(passageName).setValue('isEnabled', true);
        this.passageMetadataApp.storeState();
    }

    disable(passageName: string) {
        if (!this.passageMetadataApp.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            if (this.passageMetadataApp.mode === 'byTag') {
                throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataApp.modeParams.filterTag}"`);
            } else {
                throw new Error(`passage "${passageName}" does'n contain metadata`);
            }
        }

        this.passageMetadataApp.get(passageName).setValue('isEnabled', false);
        this.passageMetadataApp.storeState();
    }

    enableByTag(tag: string) {
        if (isArray(this._passagesByTagIndex[tag])) {
            this._passagesByTagIndex[tag].forEach((passageName) => {
                const passageMetadata = this.passageMetadataApp.get(passageName);
                passageMetadata.setValue('isEnabled', true);
            });

            this.passageMetadataApp.storeState();
        }
    }

    disableByTag(tag: string) {
        if (isArray(this._passagesByTagIndex[tag])) {
            this._passagesByTagIndex[tag].forEach((passageName) => {
                const passageMetadata = this.passageMetadataApp.get(passageName);
                passageMetadata.setValue('isEnabled', false);
            });

            this.passageMetadataApp.storeState();
        }
    }

    runRandomEvent(passageName: string, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType {
        this.debugLogCollector.clear();

        rewriteConfiguration = {
            ...{
                isValidateIsEnable: true,
                isEnabled: null,
                isValidateFilter: true,
                filter: null,
                isValidateLimitationStrategy: true,
                limitationStrategy: null,
                isValidateThreshold: true,
                threshold: null,
            },
            ...(rewriteConfiguration ?? {})
        }

        if (!this.passageMetadataApp.has(passageName)) {
            if (!this.sugarcubeFacade.hasPassage(passageName)) {
                throw new Error(`passage "${passageName}" does not exist`);
            }

            throw new Error(`passage "${passageName}" exist but without tag "${this.passageMetadataApp.modeParams.filterTag}"`);
        }

        const passageMetadata = (this.passageMetadataApp.get(passageName)).data as RandomEventType;
        this.debugLogCollector.addLog(null, `Start random event ${passageMetadata.passageName}`, 1);
        this.debugLogCollector.increaseLevel();

        let result = true;

        if (this.lock.isLocked) {
            result = false;
            this.debugLogCollector.addLog(null, `Skip because lock already acquired`, 1);

            return {
                isSuccess: result,
                debugLogCollector: this.debugLogCollector,
                resultList: [
                    {
                        passageMetadata,
                        usedTags: [],
                    },
                ],
            };
        }

        try {
            const compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);
            const checkResult = this.constraintsVerificator.verify(passageMetadata, compiledTags, rewriteConfiguration);

            this.debugLogCollector
                .addLog(null, `Verify:`, 2)
                .increaseLevel()
                .merge(checkResult.debugLogCollector)
                .decreaseLevel();

            return {
                isSuccess: checkResult.result,
                debugLogCollector: this.debugLogCollector,
                resultList: [
                    {
                        passageMetadata,
                        usedTags: passageMetadata._isLimitationStrategiesTagged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags]
                    },
                ],
            };
        } catch (error) {
            // TODO add data to error
            throw error;
        }
    }

    private weightedIndexChoice(arr: SingleRandomEventResultType[]) {
        const totalWeight = arr.map((v: SingleRandomEventResultType) => v.group.weight).reduce((x, y) => x + y);
        const val = Math.random() * totalWeight;
        for (let i = 0, cur = 0; ; i++) {
            cur += arr[i].group.weight;
            if (val <= cur) return i;
        }
    }
    private weightedShuffle(arr: [SingleRandomEventResultType?]) {
        for (let i = 0; i < arr.length; i++) {
            const v = this.weightedIndexChoice(arr.slice(i));
            [arr[i + v], arr[i]] = [arr[i], arr[i + v]];
        }

        return arr;
    }

    runGroup(groupName: string, groupThreshold?: number, groupResultCount: number = 1, rewriteConfiguration?: RewriteConfigurationType): RunRandomEventResultType {
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

        if (!isArray(this._passagesByGroupIndex[groupName])) {
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

        if (isNumber(groupThreshold) || isString(groupThreshold)) {
            try {
                const checkResult = this.constraintsVerificator.verifyThreshold(groupThreshold);
                result = checkResult.result;
                this.debugLogCollector
                    .addLog(null, 'Verify group threshold', 2)
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();
            } catch (error) {
                // TODO add data to error
                throw error;
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

        const sucessRandomEventsResults: [SingleRandomEventResultType?] = [];
        for (let groupIndex = 0; groupIndex < this._passagesByGroupIndex[groupName].length; groupIndex++) {
            const passageName = this._passagesByGroupIndex[groupName][groupIndex];
            const passageMetadata = (this.passageMetadataApp.get(passageName)).data as RandomEventType;
            const group = passageMetadata.groups[passageMetadata._groupByNameIndex[groupName]];

            this.debugLogCollector
                .addLog(null, `Random event ${passageMetadata.passageName} with weight ${group.weight}`, 1)
                .increaseLevel()

            try {
                const compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);
                const checkResult = this.constraintsVerificator.verify(passageMetadata, compiledTags, rewriteConfiguration);
                const result = checkResult.result;
                this.debugLogCollector
                    .addLog(null, `Verify`, 2)
                    .increaseLevel()
                    .merge(checkResult.debugLogCollector)
                    .decreaseLevel();

                if (result) {
                    sucessRandomEventsResults.push({
                        isSuccess: result,
                        passageMetadata: passageMetadata,
                        usedTags: passageMetadata._isLimitationStrategiesTagged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags],
                        group: group,
                    });
                }
            } catch (error) {
                // TODO add data to error
                throw error;
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

        let winnerRandomEventResults: SingleRandomEventResultType[] = [];
        if (sucessRandomEventsResults[0].group.type === GroupTypeEnum.Sequential) {
            this.debugLogCollector
                .addLog(true, `Find winner event`, 2)
                .increaseLevel();
            const sucessRandomEventsSequentialResults = sucessRandomEventsResults.filter((sucessRandomEventsResult) => {
                return this.randomEventStats.getPassageRunCountHistory(sucessRandomEventsResult.passageMetadata.passageName) < sucessRandomEventsResult.group.sequentialCount;
            });
            this.debugLogCollector.addLog(true, `sequential search found ${sucessRandomEventsSequentialResults.length} siutable events`, 3);

            if (sucessRandomEventsSequentialResults.length > 0) {
                winnerRandomEventResults = sucessRandomEventsSequentialResults.sort((a: SingleRandomEventResultType, b: SingleRandomEventResultType): number => {
                    return a.group.sequentialIndex - b.group.sequentialIndex;
                }).slice(0, groupResultCount);

                let resultList: [{passageMetadata?: RandomEventType, usedTags?: [string[]?]}?] = [];
                if (winnerRandomEventResults.length > 1) {
                    let winnerRandomEventResultsNames: string[] = [];

                    winnerRandomEventResults.forEach((winnerRandomEventResult) => {
                        winnerRandomEventResultsNames.push(winnerRandomEventResult.passageMetadata.passageName);
                        resultList.push({
                            passageMetadata: winnerRandomEventResult.passageMetadata,
                            usedTags: winnerRandomEventResult.usedTags,
                        });
                    });
                    this.debugLogCollector.addLog(true, `winner random events: ${winnerRandomEventResultsNames.join(', ')}`, 3);
                } else {
                    resultList.push({
                        passageMetadata: winnerRandomEventResults[0].passageMetadata,
                        usedTags: winnerRandomEventResults[0].usedTags,
                    });
                    this.debugLogCollector.addLog(true, `winner random event: ${winnerRandomEventResults[0].passageMetadata.passageName}`, 3);
                }

                return {
                    isSuccess: result,
                    debugLogCollector: this.debugLogCollector,
                    group: winnerRandomEventResults[0].group,
                    resultList
                };
            }
        }

        if (sucessRandomEventsResults.length < groupResultCount) {
            groupResultCount = sucessRandomEventsResults.length;
        }

        winnerRandomEventResults = (sucessRandomEventsResults.length > 1 ? this.weightedShuffle(sucessRandomEventsResults) : sucessRandomEventsResults).slice(0, groupResultCount);

        let resultList: [{passageMetadata?: RandomEventType, usedTags?: [string[]?]}?] = [];
        let winnerRandomEventResultsNames: string[] = [];

        winnerRandomEventResults.forEach((winnerRandomEventResult) => {
            winnerRandomEventResultsNames.push(winnerRandomEventResult.passageMetadata.passageName);
            resultList.push({
                passageMetadata: winnerRandomEventResult.passageMetadata,
                usedTags: winnerRandomEventResult.usedTags,
            });
        });

        this.debugLogCollector.addLog(true, `winner random events: ${winnerRandomEventResultsNames.join(', ')}`, 3);

        return {
            isSuccess: result,
            debugLogCollector: this.debugLogCollector,
            group: winnerRandomEventResults[0].group,
            resultList,
        };
    }

    incrementRunCounters(passageName: string, usedTags?: [string[]?]) {
        this.randomEventStats.incrementPassageRunCount(passageName);
        this.randomEventStats.incrementTagsRunCount(passageName, usedTags);
        this.passageMetadataApp.storeState();
    }

    resetRunCounterByPassage(passageName: string) {
        this.randomEventStats.resetPassageRunCount(passageName);
        this.passageMetadataApp.storeState();
    }

    resetRunCounterByTag(tag: string) {
        this.randomEventStats.resetTagsRunCount(tag);
        this.passageMetadataApp.storeState();
    }
}
