import TypeChecker from "./tools/TypeChecker";
import History from "./History";
import { LimitationStrategyVariableType } from "./type/Variables";
import PassageMetadataCollection from "./PassageMetadataCollection";

export default class StateLoader {
    isLoaded = false;

    constructor(
        private passageMetadataCollection: PassageMetadataCollection,
        private history: History,
    ) {
    }

    forceSetIsLoadedFlag(isLoaded: boolean) {
        this.isLoaded = isLoaded;
    }

    resetIsLoadedFlag() {
        this.isLoaded = false;
    }

    loadState(variables: LimitationStrategyVariableType) {
        if (!this.isLoaded) {
            this.oldLoadState(variables);

            if (!this.isLoaded) {
                if (variables.randomEventHistory !== undefined) {
                    this.history.loadFromSerilizedString(variables.randomEventHistory);
                    Object.keys(this.history.forceEventStatus).forEach((passageName) => {
                        if (this.history.forceEventStatus[passageName]) {
                            this.passageMetadataCollection.enable(passageName);
                        } else {
                            this.passageMetadataCollection.disable(passageName);
                        }
                    })

                    this.isLoaded = true;
                }
            }
        }
    }

    /** @deprecated only for backward compatibility */
    oldLoadState(variables: LimitationStrategyVariableType) {
        if (!this.isLoaded) {
            if (variables.randomEventFiredEvents !== undefined) {
                const firedEvents = JSON.parse(variables.randomEventFiredEvents);
                Object.keys(firedEvents).forEach((firedEventsKey) => {
                    if (firedEventsKey !== "") {
                        if (TypeChecker.isInteger(firedEvents[firedEventsKey]) && firedEvents[firedEventsKey] > 0) {
                            this.history.setActualRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents[firedEventsKey]);
                            this.history.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents[firedEventsKey]);
                        } else {
                            this.history.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), 1);
                        }
                    }
                });

                delete variables.randomEventFiredEvents;
                this.isLoaded = true;
            }
            if (variables.randomEventFiredTags !== undefined) {
                const firedTags = JSON.parse(variables.randomEventFiredTags);
                Object.keys(firedTags).forEach((firedTagsKey) => {
                    if (firedTagsKey !== "") {
                        if (TypeChecker.isInteger(firedTags[firedTagsKey]) && firedTags[firedTagsKey] > 0) {
                            this.history.setActualTagFiredCounter(firedTagsKey.toLowerCase(), firedTags[firedTagsKey]);
                            this.history.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), firedTags[firedTagsKey]);
                        } else {
                            this.history.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), 1);
                        }
                    }
                });

                delete variables.randomEventFiredTags;
                this.isLoaded = true;
            }
            if (variables.randomEventEnabledEvents !== undefined) {
                const enabledEvents: string[] = JSON.parse(variables.randomEventEnabledEvents);
                if (TypeChecker.isArray(enabledEvents)) {
                    enabledEvents.forEach((eventName) => {
                        if (this.passageMetadataCollection.has(eventName)) {
                            this.passageMetadataCollection.enable(eventName);
                            this.history.enable(eventName, false);
                        }
                    });
                }

                delete variables.randomEventEnabledEvents;
                this.isLoaded = true;
            }
            if (variables.randomEventDisabledEvents !== undefined) {
                const disabledEvents: string[] = JSON.parse(variables.randomEventDisabledEvents);
                if (TypeChecker.isArray(disabledEvents)) {
                    disabledEvents.forEach((eventName) => {
                        if (this.passageMetadataCollection.has(eventName)) {
                            this.passageMetadataCollection.disable(eventName);
                            this.history.disable(eventName, false);
                        }
                    });
                }

                delete variables.randomEventDisabledEvents;
                this.isLoaded = true;
            }

            if (this.isLoaded) {
                this.history.store();
            }
        }
    }
}
