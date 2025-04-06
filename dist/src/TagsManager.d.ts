import SugarcubeFacade from "./facade/SugarcubeFacade";
export default class TagsManager {
    private sugarcubeFacade;
    constructor(sugarcubeFacade: SugarcubeFacade);
    prepareTags(tags: string[]): any[];
    convertTagsToStringKey(tags: string[]): string;
}
//# sourceMappingURL=TagsManager.d.ts.map