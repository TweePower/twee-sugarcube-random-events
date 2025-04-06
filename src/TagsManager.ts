import SugarcubeFacade from "./facade/SugarcubeFacade";
import { isTweeScript } from "./tools/TypeChecker";

export default class TagsManager {
    constructor(private sugarcubeFacade: SugarcubeFacade) {
    }

    prepareTags(tags: string[]) {
        return tags.map((tag) => {
            if (!isTweeScript(tag)) {
                return tag;
            } else {
                try {
                    return this.sugarcubeFacade.runTeweeScript(tag).trim().replace(' ', '__');
                } catch (error) {
                    throw new Error("Invalid random event scripted tag: " + tag);
                }
            }
        }).sort();
    }

    convertTagsToStringKey(tags: string[]): string {
        return this.prepareTags(tags).join('_');
    }
}
