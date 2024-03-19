import TypeChecker from "./tools/TypeChecker";
import RandomEventCollection from "./RandomEventCollection";
import RandomEventHistory from "./RandomEventHistory";
import { LimitationStrategyVariableType } from "./type/Variables";

export default class StateLoader {
    isLoaded = false;

    constructor(
        private randomEventCollection: RandomEventCollection,
        private randomEventHistory: RandomEventHistory,
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
                    this.randomEventHistory.loadFromSerilizedString(variables.randomEventHistory);
                    Object.keys(this.randomEventHistory.forceEventStatus).forEach((randomEventName) => {
                        if (this.randomEventHistory.forceEventStatus[randomEventName]) {
                            this.randomEventCollection.enable(randomEventName);
                        } else {
                            this.randomEventCollection.disable(randomEventName);
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
                            this.randomEventHistory.setActualRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents[firedEventsKey]);
                            this.randomEventHistory.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents[firedEventsKey]);
                        } else {
                            this.randomEventHistory.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), 1);
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
                            this.randomEventHistory.setActualTagFiredCounter(firedTagsKey.toLowerCase(), firedTags[firedTagsKey]);
                            this.randomEventHistory.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), firedTags[firedTagsKey]);
                        } else {
                            this.randomEventHistory.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), 1);
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
                        if (this.randomEventCollection.has(eventName)) {
                            this.randomEventCollection.enable(eventName);
                            this.randomEventHistory.enable(eventName, false);
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
                        if (this.randomEventCollection.has(eventName)) {
                            this.randomEventCollection.disable(eventName);
                            this.randomEventHistory.disable(eventName, false);
                        }
                    });
                }

                delete variables.randomEventDisabledEvents;
                this.isLoaded = true;
            }

            if (this.isLoaded) {
                this.randomEventHistory.store();
            }
        }
    }
}
