import TagList from "../model/TagList";
import TagFactory from "./TagFactory";
export default class TagListFactory {
    private tagFactory;
    constructor(tagFactory: TagFactory);
    createFromPassageMetadataObject(tagListMetadata?: string | string[] | any): TagList;
}
//# sourceMappingURL=TagListFactory.d.ts.map