import Tags from "./Tags";
import SugarcubeFacade from "./facade/SugarcubeFacade";

export default class TagsManager {
    constructor(private sugarcubeFacade: SugarcubeFacade) {
    }

    static isTagHaveTweeScript(tag: string): boolean {
        return !(/^\w+[\w_\- ]+$/.test(tag));
    }

    prepareTags(tags: Tags | string[]) {
        if (tags instanceof Tags) {
            if (tags.isHaveTweeScriptTags) {
                return tags.tags.map((tag) => {
                    if (!tag.isHaveTweeScript) {
                        return tag.tag;
                    } else {
                        try {
                            return this.sugarcubeFacade.runTeweeScript(tag.tag).toLowerCase().trim().replace(' ', '__');
                        } catch (err) {
                            throw new Error("Invalid random event scripted tag: " + tag.tag);
                        }
                    }
                }).sort()
            } else {
                return [...tags.stringTags].sort();
            }
        } else {
            return tags.map((tag) => {
                if (!TagsManager.isTagHaveTweeScript(tag)) {
                    return tag;
                } else {
                    try {
                        return this.sugarcubeFacade.runTeweeScript(tag).toLowerCase().trim().replace(' ', '__');
                    } catch (err) {
                        throw new Error("Invalid random event scripted tag: " + tag);
                    }
                }
            }).sort();
        }
    }

    convertTagsToStringKey(tags: Tags | string[]): string {
        return this.prepareTags(tags).join('_');
    }
}
