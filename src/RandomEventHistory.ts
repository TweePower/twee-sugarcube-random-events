declare let State: {
    variables: { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default class RandomEventHistory {
    actualFiredEvents: { [eventName: string]: number } = {};
    actualFiredTags: { [tag: string]: number } = {};
    historyFiredEvents: { [eventName: string]: number } = {};
    historyFiredTags: { [tag: string]: number } = {};
    forceEventStatus: { [eventName: string]: boolean } = {};

    loadFromSerilizedString(serializedString: string): void {
        const state = JSON.parse(serializedString);

        Object.keys(state.e).forEach((randomeEventName) => {
            if (state.e[randomeEventName].a !== undefined) {
                this.actualFiredEvents[randomeEventName] = state.e[randomeEventName].a;
            }
            if (state.e[randomeEventName].h !== undefined) {
                this.historyFiredEvents[randomeEventName] = state.e[randomeEventName].h;
            }
            if (state.e[randomeEventName].s !== undefined) {
                this.forceEventStatus[randomeEventName] = state.e[randomeEventName].s === 1;
            }
        });
        Object.keys(state.t).forEach((tag) => {
            if (state.t[tag].a !== undefined) {
                this.actualFiredTags[tag] = state.t[tag].a;
            }
            if (state.t[tag].h !== undefined) {
                this.historyFiredTags[tag] = state.t[tag].h;
            }
        });
    }

    serialize(): string {
        const result: {
            e: { [key: string] : { a?: number, h?: number, s?: number }},
            t: { [key: string] : { a?: number, h?: number }},
        } = { e: {}, t: {} };

        Object.keys(this.actualFiredEvents).forEach((randomeEventName) => {
            if (result.e[randomeEventName] === undefined) {
                result.e[randomeEventName] = {};
            }
            result.e[randomeEventName].a = this.actualFiredEvents[randomeEventName];
        });
        Object.keys(this.historyFiredEvents).forEach((randomeEventName) => {
            if (result.e[randomeEventName] === undefined) {
                result.e[randomeEventName] = {};
            }
            result.e[randomeEventName].h = this.historyFiredEvents[randomeEventName];
        });
        Object.keys(this.forceEventStatus).forEach((randomeEventName) => {
            if (result.e[randomeEventName] === undefined) {
                result.e[randomeEventName] = {};
            }
            result.e[randomeEventName].s = this.forceEventStatus[randomeEventName] === true ? 1 : 0;
        });
        Object.keys(this.actualFiredTags).forEach((tag) => {
            if (result.t[tag] === undefined) {
                result.t[tag] = {};
            }
            result.t[tag].a = this.actualFiredTags[tag];
        });
        Object.keys(this.historyFiredTags).forEach((tag) => {
            if (result.t[tag] === undefined) {
                result.t[tag] = {};
            }
            result.t[tag].h = this.historyFiredTags[tag];
        });

        return JSON.stringify(result);
    }

    store(): void {
        State.variables.randomEventHistory = this.serialize();
    }

    /** @deprecated only for backward compatibility */
    setActualRandomEventFiredCounter(randomeEventName: string, count: number): void {
        randomeEventName = randomeEventName.toLowerCase();
        this.actualFiredEvents[randomeEventName] = count;
    }

    /** @deprecated only for backward compatibility */
    setActualTagFiredCounter(tag: string, count: number): void {
        tag = tag.toLowerCase();
        this.actualFiredTags[tag] = count;
    }

    /** @deprecated only for backward compatibility */
    setHistoryRandomEventFiredCounter(randomeEventName: string, count: number): void {
        randomeEventName = randomeEventName.toLowerCase();
        this.historyFiredEvents[randomeEventName] = count;
    }

    /** @deprecated only for backward compatibility */
    setHistoryTagFiredCounter(tag: string, count: number): void {
        tag = tag.toLowerCase();
        this.historyFiredTags[tag] = count;
    }

    enable(randomeEventName: string, isStoreImmediately: boolean = true): void {
        randomeEventName = randomeEventName.toLowerCase();
        this.forceEventStatus[randomeEventName] = true;

        if (isStoreImmediately) {
            this.store();
        }
    }

    disable(randomeEventName: string, isStoreImmediately: boolean = true): void {
        randomeEventName = randomeEventName.toLowerCase();
        this.forceEventStatus[randomeEventName] = false;

        if (isStoreImmediately) {
            this.store();
        }
    }

    incrementRandomEventFiredCounter(randomeEventName: string, isStoreImmediately: boolean = true): void {
        randomeEventName = randomeEventName.toLowerCase();
        this.actualFiredEvents[randomeEventName] = this.actualFiredEvents[randomeEventName] === undefined ? 1 : this.actualFiredEvents[randomeEventName] + 1;
        this.historyFiredEvents[randomeEventName] = this.historyFiredEvents[randomeEventName] === undefined ? 1 : this.historyFiredEvents[randomeEventName] + 1;

        if (isStoreImmediately) {
            this.store();
        }
    }

    incrementTagsFiredCounter(tags: string[] | null, isStoreImmediately: boolean = true): void {
        if (tags !== null) {
            const uniqueTags = tags.filter((tag, index, array) => array.indexOf(tag) === index);

            uniqueTags.forEach(tag => {
                tag = tag.toLowerCase();
                this.actualFiredTags[tag] = this.actualFiredTags[tag] === undefined ? 1 : this.actualFiredTags[tag] + 1;
                this.historyFiredTags[tag] = this.historyFiredTags[tag] === undefined ? 1 : this.historyFiredTags[tag] + 1;
            });

            if (isStoreImmediately) {
                this.store();
            }
        }
    }

    resetRandomEventFiredCounter(randomeEventName: string, isStoreImmediately: boolean = true): void {
        randomeEventName = randomeEventName.toLowerCase();
        if (this.actualFiredEvents[randomeEventName] !== undefined) {
            delete this.actualFiredEvents[randomeEventName];
        }

        if (isStoreImmediately) {
            this.store();
        }
    }

    resetTagFiredCounter(tag: string, isStoreImmediately: boolean = true): void {
        tag = tag.toLowerCase();
        if (this.actualFiredTags[tag] !== undefined) {
            delete this.actualFiredTags[tag];
        }

        if (isStoreImmediately) {
            this.store();
        }
    }

    getActualFiredEventCount(randomeEventName: string): number {
        randomeEventName = randomeEventName.toLowerCase();
        return this.actualFiredEvents[randomeEventName] ?? 0;
    }

    getActualFiredTagCount(tag: string): number {
        tag = tag.toLowerCase();
        return this.actualFiredTags[tag] ?? 0;
    }

    getHistoryFiredEventCount(randomeEventName: string): number {
        randomeEventName = randomeEventName.toLowerCase();
        return this.historyFiredEvents[randomeEventName] ?? 0;
    }

    getHistoryFiredTagCount(tag: string): number {
        tag = tag.toLowerCase();
        return this.historyFiredTags[tag] ?? 0;
    }
}
