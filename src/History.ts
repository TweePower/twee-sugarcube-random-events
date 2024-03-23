import SugarcubeFacade from "./facade/SugarcubeFacade";

export default class History {
    actualFiredEvents: { [eventName: string]: number } = {};
    actualFiredTags: { [tag: string]: number } = {};
    historyFiredEvents: { [eventName: string]: number } = {};
    historyFiredTags: { [tag: string]: number } = {};
    forceEventStatus: { [eventName: string]: boolean } = {};

    constructor(private sugarcubeFacade: SugarcubeFacade) {
    }

    loadFromSerilizedString(serializedString: string): void {
        const state = JSON.parse(serializedString);

        Object.keys(state.e).forEach((passageName) => {
            if (state.e[passageName].a !== undefined) {
                this.actualFiredEvents[passageName] = state.e[passageName].a;
            }
            if (state.e[passageName].h !== undefined) {
                this.historyFiredEvents[passageName] = state.e[passageName].h;
            }
            if (state.e[passageName].s !== undefined) {
                this.forceEventStatus[passageName] = state.e[passageName].s === 1;
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

        Object.keys(this.actualFiredEvents).forEach((passageName) => {
            if (result.e[passageName] === undefined) {
                result.e[passageName] = {};
            }
            result.e[passageName].a = this.actualFiredEvents[passageName];
        });
        Object.keys(this.historyFiredEvents).forEach((passageName) => {
            if (result.e[passageName] === undefined) {
                result.e[passageName] = {};
            }
            result.e[passageName].h = this.historyFiredEvents[passageName];
        });
        Object.keys(this.forceEventStatus).forEach((passageName) => {
            if (result.e[passageName] === undefined) {
                result.e[passageName] = {};
            }
            result.e[passageName].s = this.forceEventStatus[passageName] === true ? 1 : 0;
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
        this.sugarcubeFacade.saveVariable('randomEventHistory', this.serialize());
    }

    /** @deprecated only for backward compatibility */
    setActualRandomEventFiredCounter(passageName: string, count: number): void {
        passageName = passageName.toLowerCase();
        this.actualFiredEvents[passageName] = count;
    }

    /** @deprecated only for backward compatibility */
    setActualTagFiredCounter(tag: string, count: number): void {
        tag = tag.toLowerCase();
        this.actualFiredTags[tag] = count;
    }

    /** @deprecated only for backward compatibility */
    setHistoryRandomEventFiredCounter(passageName: string, count: number): void {
        passageName = passageName.toLowerCase();
        this.historyFiredEvents[passageName] = count;
    }

    /** @deprecated only for backward compatibility */
    setHistoryTagFiredCounter(tag: string, count: number): void {
        tag = tag.toLowerCase();
        this.historyFiredTags[tag] = count;
    }

    enable(passageName: string, isStoreImmediately: boolean = true): void {
        passageName = passageName.toLowerCase();
        this.forceEventStatus[passageName] = true;

        if (isStoreImmediately) {
            this.store();
        }
    }

    disable(passageName: string, isStoreImmediately: boolean = true): void {
        passageName = passageName.toLowerCase();
        this.forceEventStatus[passageName] = false;

        if (isStoreImmediately) {
            this.store();
        }
    }

    incrementRandomEventFiredCounter(passageName: string, isStoreImmediately: boolean = true): void {
        passageName = passageName.toLowerCase();
        this.actualFiredEvents[passageName] = this.actualFiredEvents[passageName] === undefined ? 1 : this.actualFiredEvents[passageName] + 1;
        this.historyFiredEvents[passageName] = this.historyFiredEvents[passageName] === undefined ? 1 : this.historyFiredEvents[passageName] + 1;

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

    resetRandomEventFiredCounter(passageName: string, isStoreImmediately: boolean = true): void {
        passageName = passageName.toLowerCase();
        if (this.actualFiredEvents[passageName] !== undefined) {
            delete this.actualFiredEvents[passageName];
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

    getActualFiredEventCount(passageName: string): number {
        passageName = passageName.toLowerCase();
        return this.actualFiredEvents[passageName] ?? 0;
    }

    getActualFiredTagCount(tag: string): number {
        tag = tag.toLowerCase();
        return this.actualFiredTags[tag] ?? 0;
    }

    getHistoryFiredEventCount(passageName: string): number {
        passageName = passageName.toLowerCase();
        return this.historyFiredEvents[passageName] ?? 0;
    }

    getHistoryFiredTagCount(tag: string): number {
        tag = tag.toLowerCase();
        return this.historyFiredTags[tag] ?? 0;
    }
}
