import PassageMetadataApp from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataApp";
import { isArray, isNumber, isObject, isString, isStringInteger, isStringNumber } from "./tools/TypeChecker";
import TagsManager from "./TagsManager";
import { PassageMetadataStateType } from "twee-sugarcube-passage-metadata-collector/src/PassageMetadataStateManager";
import PassageMetadata from "twee-sugarcube-passage-metadata-collector/src/PassageMetadata";
import { LimitationStrategyType, RandomEventType } from "./type/PassageMetadata";

declare type OptimizedPassageMetadataStateType = {
    a?: number,
    h?: number,
    t?: {[tagIndex: number]: {
        a?: number,
        h?: number,
    }}
};

export default class RandomEventStats {
    private passagesRunCountHistory: {[passageName: string]: number} = {};
    private passagesRunCountActual: {[passageName: string]: number} = {};
    private tagsRunCountHistory: {[tag: string]: number} = {};
    private tagsRunCountActual: {[tag: string]: number} = {};

    private _passagesByTagIndex: {[tag: string]: string[]} = {};
    private _tagsStringKeysByPassageAndTagIndex: {[tag: string]: {[passageName: string]: string[]}} = {};
    private _tagsStringKeysIndex: {[tagsStringKey: string]: string[]} = {};

    constructor(
        private passageMetadataApp: PassageMetadataApp,
        private tagsManager: TagsManager
    ) {
        passageMetadataApp.onAfterAddMetadata.add((passageMetadata: PassageMetadata) => {
            const data: RandomEventType = passageMetadata.data as RandomEventType;

            data._stringTags.forEach((tag: string) => {
                if (!isString(tag) || tag.length <= 0) {
                    return;
                }

                if (this._passagesByTagIndex[tag] === undefined) {
                    this._passagesByTagIndex[tag] = [];
                }

                this._passagesByTagIndex[tag].push(data.passageName);
            });

            data.limitationStrategies.forEach((limitationStrategy: LimitationStrategyType) => {
                if (isArray(limitationStrategy.tags) && limitationStrategy.tags.length > 0) {
                    const tags = limitationStrategy.tags;
                    if (limitationStrategy.isSeparate === true) {
                        tags.push(data.passageName);
                    }
                    const tagsStringKey = this.tagsManager.convertTagsToStringKey(tags);

                    if (this._tagsStringKeysIndex[tagsStringKey] === undefined) {
                        this._tagsStringKeysIndex[tagsStringKey] = [];
                    }

                    if (limitationStrategy.isSeparate === true) {
                        tags.push(data.passageName);
                    }

                    limitationStrategy.tags.forEach((tag: string) => {
                        if (!isString(tag) || tag.length <= 0) {
                            return;
                        }

                        if (this._passagesByTagIndex[tag] === undefined) {
                            this._passagesByTagIndex[tag] = [];
                        }

                        if (!this._passagesByTagIndex[tag].includes(passageMetadata.passageName)) {
                            this._passagesByTagIndex[tag].push(passageMetadata.passageName);
                        }

                        if (this._tagsStringKeysByPassageAndTagIndex[tag] === undefined) {
                            this._tagsStringKeysByPassageAndTagIndex[tag] = {};
                        }

                        if (this._tagsStringKeysByPassageAndTagIndex[tag][data.passageName] === undefined) {
                            this._tagsStringKeysByPassageAndTagIndex[tag][data.passageName] = [];
                        }

                        this._tagsStringKeysByPassageAndTagIndex[tag][data.passageName].push(tagsStringKey);

                        if (!this._tagsStringKeysIndex[tagsStringKey].includes(tag)) {
                            this._tagsStringKeysIndex[tagsStringKey].push(tag);
                        }
                    });
                }
            });
        });

        passageMetadataApp.onBeforeRestore.add((state: PassageMetadataStateType) => {
            console.log(state);

            const tagsIndex: {[tag: number]: string} = {};
            if (state.__tags !== undefined) {
                state.__tags.forEach((tag: string, index: number) => {
                    tagsIndex[index] = tag;
                });

                delete state.__tags;
            }

            this.passagesRunCountHistory = {};
            this.passagesRunCountActual = {};
            this.tagsRunCountHistory = {};
            this.tagsRunCountActual = {};

            const passageNames = Object.keys(state);

            passageNames.forEach((passageName: string) => {
                const data = state[passageName];

                if (data._runCountActual === undefined) {
                    data._runCountActual = 0;
                }

                if (data._runCountHistory === undefined) {
                    data._runCountHistory = 0;
                }

                if (data._runCountByTagsActual === undefined) {
                    data._runCountByTagsActual = {};
                }

                if (data._runCountByTagsHistory === undefined) {
                    data._runCountByTagsHistory = {};
                }

                if (data.s !== undefined) {
                    data._runCountActual = data.s.a ?? data._runCountActual;
                    data._runCountHistory = data.s.h ?? data._runCountHistory;

                    if (data.s.t !== undefined) {
                        const tagsIndexes = Object.keys(data.s.t).map((index) => parseInt(index));

                        tagsIndexes.forEach((tagIndex: number) => {
                            if (data.s.t[tagIndex].a !== undefined) {
                                data._runCountByTagsActual[tagsIndex[tagIndex]] = data.s.t[tagIndex].a;
                            }

                            if (data.s.t[tagIndex].h !== undefined) {
                                data._runCountByTagsHistory[tagsIndex[tagIndex]] = data.s.t[tagIndex].h;
                            }
                        });
                    }

                    delete data.s;
                }

                if (isNumber(data._runCountActual)) {
                    this.passagesRunCountActual[passageName] = data._runCountActual;
                }

                if (isNumber(data._runCountHistory)) {
                    this.passagesRunCountHistory[passageName] = data._runCountHistory;
                }

                if (isObject(data._runCountByTagsActual)) {
                    const tags = Object.keys(data._runCountByTagsActual);

                    tags.forEach((tag: string) => {
                        if (this.tagsRunCountActual[tag] === undefined) {
                            this.tagsRunCountActual[tag] = 0;
                        }

                        this.tagsRunCountActual[tag] += data._runCountByTagsActual[tag];
                    });
                }

                if (isObject(data._runCountByTagsHistory)) {
                    const tags = Object.keys(data._runCountByTagsHistory);

                    tags.forEach((tag: string) => {
                        if (this.tagsRunCountHistory[tag] === undefined) {
                            this.tagsRunCountHistory[tag] = 0;
                        }

                        this.tagsRunCountHistory[tag] += data._runCountByTagsHistory[tag];
                    });
                }
            })
        });

        passageMetadataApp.onBeforeStore.add((state: PassageMetadataStateType) => {
            let tagsIndexLength = 0;
            const tagsIndex: {[tag: string]: number} = {};
            const passageNames = Object.keys(state);

            passageNames.forEach((passageName: string) => {
                const data = state[passageName];

                const optimizedStats: OptimizedPassageMetadataStateType = {};

                if (isNumber(data._runCountActual)) {
                    optimizedStats.a = data._runCountActual;
                    delete data._runCountActual;
                }

                if (isNumber(data._runCountHistory)) {
                    optimizedStats.h = data._runCountHistory;
                    delete data._runCountHistory;
                }

                if (isObject(data._runCountByTagsActual)) {
                    const tags = Object.keys(data._runCountByTagsActual);

                    if (tags.length > 0) {
                        optimizedStats.t = {};

                        tags.forEach((tag: string) => {
                            if (tagsIndex[tag] === undefined) {
                                tagsIndex[tag] = tagsIndexLength;
                                tagsIndexLength++;
                            }

                            if (optimizedStats.t[tagsIndex[tag]] === undefined) {
                                optimizedStats.t[tagsIndex[tag]] = {};
                            }

                            optimizedStats.t[tagsIndex[tag]].a = data._runCountByTagsActual[tag];
                        });
                    }

                    delete data._runCountByTagsActual;
                }

                if (isObject(data._runCountByTagsHistory)) {
                    const tags = Object.keys(data._runCountByTagsHistory);

                    if (tags.length > 0) {
                        if (optimizedStats.t === undefined) {
                            optimizedStats.t = {};
                        }

                        tags.forEach((tag: string) => {
                            if (tagsIndex[tag] === undefined) {
                                tagsIndex[tag] = tagsIndexLength;
                                tagsIndexLength++;
                            }

                            if (optimizedStats.t[tagsIndex[tag]] === undefined) {
                                optimizedStats.t[tagsIndex[tag]] = {};
                            }

                            optimizedStats.t[tagsIndex[tag]].h = data._runCountByTagsHistory[tag];
                        });
                    }

                    delete data._runCountByTagsHistory;
                }

                if (Object.keys(optimizedStats).length > 0) {
                    data.s = optimizedStats;
                }
            });

            if (tagsIndexLength > 0) {
                state.__tags = Object.keys(tagsIndex);
            }
        });
    }

    public incrementPassageRunCount(passageName: string, count: number = 1, isStoreImmediately: boolean = false) {
        const passageMetadata = this.passageMetadataApp.get(passageName);

        const runCountHistory = passageMetadata.data._runCountHistory + count;
        const runCountActual = passageMetadata.data._runCountActual + count;

        passageMetadata.setValue('_runCountHistory', runCountHistory);
        passageMetadata.setValue('_runCountActual', runCountActual);
        this.passagesRunCountHistory[passageName] = runCountHistory;
        this.passagesRunCountActual[passageName] = runCountActual;

        if (isStoreImmediately === true) {
            this.passageMetadataApp.storeState();
        }
    }

    public incrementTagsRunCount(passageName: string, tagsList: string[][], count: number = 1, isStoreImmediately: boolean = false) {
        const passageMetadata = this.passageMetadataApp.get(passageName);

        const currentRunCountByTagsHistory: {[tag: string]: number} = passageMetadata.data._runCountByTagsHistory;
        const currentRunCountByTagsActual: {[tag: string]: number} = passageMetadata.data._runCountByTagsActual;
        if (isArray(tagsList) && tagsList.length > 0) {
            tagsList.forEach(tags => {
                if (isArray(tags) && tags.length > 0) {
                    const uniqueTags = [...tags].filter((tag, index, array) => array.indexOf(tag) === index);
                    const tagsStringKey = this.tagsManager.convertTagsToStringKey(tags);

                    uniqueTags.forEach(tag => {
                        if (tag !== '') {
                            currentRunCountByTagsHistory[tag] = currentRunCountByTagsHistory[tag] === undefined ? count : currentRunCountByTagsHistory[tag] + count;
                            currentRunCountByTagsActual[tag] = currentRunCountByTagsActual[tag] === undefined ? count : currentRunCountByTagsActual[tag] + count;
                            this.tagsRunCountHistory[tag] = this.tagsRunCountHistory[tag] === undefined ? count : this.tagsRunCountHistory[tag] + count;
                            this.tagsRunCountActual[tag] = this.tagsRunCountActual[tag] === undefined ? count : this.tagsRunCountActual[tag] + count;
                        }
                    });

                    if (tagsStringKey !== '') {
                        currentRunCountByTagsHistory[tagsStringKey] = currentRunCountByTagsHistory[tagsStringKey] === undefined ? count : currentRunCountByTagsHistory[tagsStringKey] + count;
                        currentRunCountByTagsActual[tagsStringKey] = currentRunCountByTagsActual[tagsStringKey] === undefined ? count : currentRunCountByTagsActual[tagsStringKey] + count;
                        this.tagsRunCountHistory[tagsStringKey] = this.tagsRunCountHistory[tagsStringKey] === undefined ? count : this.tagsRunCountHistory[tagsStringKey] + count;
                        this.tagsRunCountActual[tagsStringKey] = this.tagsRunCountActual[tagsStringKey] === undefined ? count : this.tagsRunCountActual[tagsStringKey] + count;
                    }
                }
            })
        }
        passageMetadata.setValue('_runCountByTagsHistory', currentRunCountByTagsHistory);
        passageMetadata.setValue('_runCountByTagsActual', currentRunCountByTagsActual);

        if (isStoreImmediately === true) {
            this.passageMetadataApp.storeState();
        }
    }

    public resetPassageRunCount(passageName: string, isStoreImmediately: boolean = false): void {
        const passageMetadata = this.passageMetadataApp.get(passageName);

        passageMetadata.setValue('_runCountActual', 0);
        this.passagesRunCountActual[passageName] = 0;

        if (isStoreImmediately === true) {
            this.passageMetadataApp.storeState();
        }
    }

    public resetTagsRunCount(tags: string | string[], isStoreImmediately: boolean = false): void {
        if (!Array.isArray(tags)) {
            tags = [tags];
        }

        if (isArray(tags)) {
            tags.forEach((tag: string) => {
                if (!isString(tag)) {
                    throw new Error('Tag shouldb be string');
                }

                if (this.tagsRunCountActual[tag] !== undefined) {
                    delete this.tagsRunCountActual[tag];
                }

                if (isArray(this._passagesByTagIndex[tag])) {
                    this._passagesByTagIndex[tag].forEach((passageName: string) => {
                        const passageMetadata = this.passageMetadataApp.get(passageName);

                        passageMetadata.setValue('_runCountActual', 0);
                        delete this.passagesRunCountActual[passageName];

                        const runCountByTagsActual = {...passageMetadata.data._runCountByTagsActual};
                        delete runCountByTagsActual[tag];
                        passageMetadata.setValue('_runCountByTagsActual', runCountByTagsActual);
                    });
                }

                if (isObject(this._tagsStringKeysByPassageAndTagIndex[tag])) {
                    const passageNames = Object.keys(this._tagsStringKeysByPassageAndTagIndex[tag]);
                    passageNames.forEach((passageName: string) => {
                        if (isArray(this._tagsStringKeysByPassageAndTagIndex[tag][passageName])) {
                            const passageMetadata = this.passageMetadataApp.get(passageName);

                            this._tagsStringKeysByPassageAndTagIndex[tag][passageName].forEach((tagsStringKey: string) => {
                                const runCountByTagsActual = {...passageMetadata.data._runCountByTagsActual};
                                if (runCountByTagsActual[tagsStringKey] !== undefined) {
                                    if (this._tagsStringKeysIndex[tagsStringKey] !== undefined) {
                                        this._tagsStringKeysIndex[tagsStringKey].forEach((tagFromTagsStringKey: string) => {
                                            if (runCountByTagsActual[tagFromTagsStringKey] !== undefined) {
                                                delete runCountByTagsActual[tagFromTagsStringKey];
                                            }

                                            if (this.tagsRunCountActual[tagFromTagsStringKey] !== undefined) {
                                                delete this.tagsRunCountActual[tagFromTagsStringKey];
                                            }
                                        })
                                    }

                                    delete runCountByTagsActual[tagsStringKey];
                                }

                                passageMetadata.setValue('_runCountByTagsActual', runCountByTagsActual);

                                if (this.tagsRunCountActual[tagsStringKey] !== undefined) {
                                    delete this.tagsRunCountActual[tagsStringKey];
                                }
                            });
                        }
                    });
                }
            });
        }

        if (isStoreImmediately === true) {
            this.passageMetadataApp.storeState();
        }
    }

    public getPassageRunCountActual(passageName: string): number {
        return this.passagesRunCountActual[passageName] ?? 0;
    }

    public getPassageRunCountHistory(passageName: string): number {
        return this.passagesRunCountHistory[passageName] ?? 0;
    }

    public getTagRunCountActual(tag: string): number {
        return this.tagsRunCountActual[tag] ?? 0;
    }

    public getTagRunCountHistory(tag: string): number {
        return this.tagsRunCountHistory[tag] ?? 0;
    }
}
