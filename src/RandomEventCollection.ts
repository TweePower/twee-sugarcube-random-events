import RandomEvent from "./RandomEvent";
import { GroupType } from "./enum/GroupType";
import Tags from "./Tags";
import TypeChecker from "./tools/TypeChecker";

export default class RandomEventCollection {
    items: { [key: string]: RandomEvent } = {};
    tagIndex: { [key: string]: string[] } = {};
    limitationStrategyTagIndex: { [key: string]: { tagGroups: { [key: string]: string[] }, events: string[] } } = {};
    groupIndex: { [key: string]: string[] } = {};
    validationGroup: { [key: string]: { type: string, indexes: number[] } } = {};

    cleanUp(): void {
        this.validationGroup = {};
    }

    add(randomEvent: RandomEvent): void {
        if (!(randomEvent instanceof RandomEvent)) {
            throw new Error(`randomEvent should be instance of RandomEvent`);
        }

        // Build search indexes + validation
        randomEvent.groups.all().forEach((group) => {
            if (this.validationGroup[group.name] === undefined) {
                this.validationGroup[group.name] = {
                    type: group.type.toString(),
                    indexes: [group.sequentialIndex],
                };
            } else {
                if (this.validationGroup[group.name].type !== group.type) {
                    throw new Error(`Group type should be the same. Group name: "${group.name}". Passage name: "${randomEvent.name}". Other passages: "${this.groupIndex[group.name].join(", ")}"`);
                }

                if (group.type === GroupType.Sequential) {
                    if (this.validationGroup[group.name].indexes.includes(group.sequentialIndex)) {
                        throw new Error(`Random event with sequentialIndex ${group.sequentialIndex} should be unique (name: ${randomEvent.name} ,group: "${group.name}")`);
                    }

                    this.validationGroup[group.name].indexes.push(group.sequentialIndex);
                }
            }

            if (this.groupIndex[group.name] === undefined) {
                this.groupIndex[group.name] = [];
            }

            this.groupIndex[group.name].push(randomEvent.name);
        });

        const stringTags = [...randomEvent.tags.getStringTags()];
        stringTags.forEach((tag) => {
            if (this.tagIndex[tag] === undefined) {
                this.tagIndex[tag] = [];
            }

            this.tagIndex[tag].push(randomEvent.name);
        });

        if (randomEvent.limitationStrategy.length > 0 && randomEvent.limitationStrategy.isTaged) {
            randomEvent.limitationStrategy.all().forEach((limitationStrategy) => {
                limitationStrategy.tags.getStringTags().forEach((tag) => {
                    if (this.limitationStrategyTagIndex[tag] === undefined) {
                        this.limitationStrategyTagIndex[tag] = {
                            events: [],
                            tagGroups: {},
                        };
                    }

                    this.limitationStrategyTagIndex[tag].events.push(randomEvent.name);

                    const limitationStrategyTags = [...limitationStrategy.tags.getStringTags()];
                    if (limitationStrategy.isSeparate) {
                        limitationStrategyTags.push(randomEvent.name);
                    }
                    this.limitationStrategyTagIndex[tag].tagGroups[new Tags(limitationStrategyTags).toStringKey()] = limitationStrategyTags;
                });
            });
        }

        this.items[randomEvent.name] = randomEvent;
    }

    has(name: string): boolean {
        if (!TypeChecker.isString(name)) {
            throw new Error(`Invalid "RandomEventCollection.has" argument type`);
        }

        return this.items[name] !== undefined;
    }

    get(name: string): RandomEvent {
        if (!this.has(name)) {
            throw new Error(`Random event with name ${name} doesn't exist`);
        }

        return this.items[name];
    }

    find(name: string): RandomEvent | null {
        return this.has(name) ? this.items[name] : null;
    }

    enable(name: string): void {
        if (!this.has(name)) {
            throw new Error(`Random event with name ${name} doesn't exist`);
        }

        this.items[name].isEnabled = true;
    }

    disable(name: string): void {
        if (!this.has(name)) {
            throw new Error(`Random event with name ${name} doesn't exist`);
        }

        this.items[name].isEnabled = false;
    }

    getEventsNamesByTag(tag: string): string[] {
        if (this.tagIndex[tag] === undefined) {
            return [];
        }

        return this.tagIndex[tag];
    }

    getEventsNamesByLimitationStrategyTag(tag: string): string[] {
        if (this.limitationStrategyTagIndex[tag] === undefined) {
            return [];
        }

        return this.limitationStrategyTagIndex[tag].events;
    }

    getTagGroupsByLimitationStrategyTag(tag: string): string[][] {
        if (this.limitationStrategyTagIndex[tag] === undefined) {
            return [];
        }

        return Object.values(this.limitationStrategyTagIndex[tag].tagGroups);
    }

    hasGroup(group: string): boolean {
        return this.groupIndex[group] !== undefined;
    }

    getEventsNamesByGroup(group: string): string[] {
        return this.groupIndex[group] ?? [];
    }
}
