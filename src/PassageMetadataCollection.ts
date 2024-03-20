import PassageMetadata from "./PassageMetadata";
import {default as BasePassageMetadataCollection} from "./PassageMetadata/PassageMetadataCollection";
import Tags from "./Tags";
import { GroupTypeEnum } from "./enum/GroupTypeEnum";

export default class PassageMetadataCollection extends BasePassageMetadataCollection {
    tagIndex: { [key: string]: string[] } = {};
    limitationStrategyTagIndex: { [key: string]: { tagGroups: { [key: string]: string[] }, events: string[] } } = {};
    groupIndex: { [key: string]: string[] } = {};
    validationGroup: { [key: string]: { type: string, indexes: number[] } } = {};

    add(passageMetadata: PassageMetadata): void {
        super.add(passageMetadata);

        // Build search indexes + validation
        passageMetadata.groups.all().forEach((group) => {
            if (this.validationGroup[group.name] === undefined) {
                this.validationGroup[group.name] = {
                    type: group.type.toString(),
                    indexes: [group.sequentialIndex],
                };
            } else {
                if (this.validationGroup[group.name].type !== group.type) {
                    throw new Error(`Group type should be the same. Group name: "${group.name}". Passage name: "${passageMetadata.name}". Other passages: "${this.groupIndex[group.name].join(", ")}"`);
                }

                if (group.type === GroupTypeEnum.Sequential) {
                    if (this.validationGroup[group.name].indexes.includes(group.sequentialIndex)) {
                        throw new Error(`Random event with sequentialIndex ${group.sequentialIndex} should be unique (name: ${passageMetadata.name} ,group: "${group.name}")`);
                    }

                    this.validationGroup[group.name].indexes.push(group.sequentialIndex);
                }
            }

            if (this.groupIndex[group.name] === undefined) {
                this.groupIndex[group.name] = [];
            }

            this.groupIndex[group.name].push(passageMetadata.name);
        });

        const stringTags = [...passageMetadata.tags.getStringTags()];
        stringTags.forEach((tag) => {
            if (this.tagIndex[tag] === undefined) {
                this.tagIndex[tag] = [];
            }

            this.tagIndex[tag].push(passageMetadata.name);
        });

        if (passageMetadata.limitationStrategy.length > 0 && passageMetadata.limitationStrategy.isTaged) {
            passageMetadata.limitationStrategy.all().forEach((limitationStrategy) => {
                limitationStrategy.tags.getStringTags().forEach((tag) => {
                    if (this.limitationStrategyTagIndex[tag] === undefined) {
                        this.limitationStrategyTagIndex[tag] = {
                            events: [],
                            tagGroups: {},
                        };
                    }

                    this.limitationStrategyTagIndex[tag].events.push(passageMetadata.name);

                    const limitationStrategyTags = [...limitationStrategy.tags.getStringTags()];
                    if (limitationStrategy.isSeparate) {
                        limitationStrategyTags.push(passageMetadata.name);
                    }
                    this.limitationStrategyTagIndex[tag].tagGroups[new Tags(limitationStrategyTags).toStringKey()] = limitationStrategyTags;
                });
            });
        }
    }

    get(name: string): PassageMetadata {
        return super.get(name) as PassageMetadata;
    }

    find(name: string): PassageMetadata | null {
        return super.find(name) as PassageMetadata | null;
    }

    cleanUp(): void {
        this.validationGroup = {};
    }

    enable(name: string): void {
        this.get(name).isEnabled = true;
    }

    disable(name: string): void {
        this.get(name).isEnabled = false;
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
